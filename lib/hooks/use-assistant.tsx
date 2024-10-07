'use client'

/**
 * @module lib/hooks/use-assistant
 * @description A custom hook to run a thread on an OpenAI assistant
 * @summary The hook is inspired by this code: https://github.com/Superexpert/openai-assistant-starter-kit/blob/7457d3a805416ade3a38d9f23215936e62b02c1e/app/ui/openai-assistant.tsx.
 */
import {useCallback, useReducer, useRef} from 'react'
import {AssistantStream} from 'openai/lib/AssistantStream'
import {FileObject} from 'openai/resources'

import {updateThread} from '@/lib/assistant/actions'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
}

type State = {
  threadId: string | null
  messages: Message[]
  streamingMessage: Message
  isLoading: boolean
  error: string | null
}

type Action =
  | {type: 'SET_THREAD_ID'; payload: string}
  | {type: 'ADD_MESSAGE'; payload: Message}
  | {type: 'SET_STREAMING_MESSAGE'; payload: Message}
  | {type: 'SET_LOADING'; payload: boolean}
  | {type: 'SET_ERROR'; payload: string | null}

const getDefaultStreamingMessage = (): Message => ({
  id: 'Thinking...',
  role: 'assistant',
  content: '_Thinking_...',
  createdAt: new Date()
})

const initialState: State = {
  threadId: null,
  messages: [],
  streamingMessage: getDefaultStreamingMessage(),
  isLoading: false,
  error: null
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_THREAD_ID':
      return {...state, threadId: action.payload}
    case 'ADD_MESSAGE':
      return {...state, messages: [...state.messages, action.payload]}
    case 'SET_STREAMING_MESSAGE':
      return {...state, streamingMessage: action.payload}
    case 'SET_LOADING':
      return {...state, isLoading: action.payload}
    case 'SET_ERROR':
      return {...state, error: action.payload}
    default:
      return state
  }
}

/**
 * Custom hook to manage interactions with an assistant.
 *
 * @param assistantId - The unique identifier for the assistant.
 * @returns An object containing the assistant's state and functions to interact with it.
 * @returns return.messages - The list of messages in the current thread.
 * @returns return.isLoading - Indicates if a message is currently being processed.
 * @returns return.error - Error message if an error occurred, otherwise null.
 * @returns return.threadId - The current thread ID, or null if no thread is active.
 * @returns return.submitMessage - Function to submit a new message to the assistant.
 * @returns return.setThreadId - Function to set the current thread ID.
 */
export function useAssistant(assistantId: string) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const messageId = useRef(0)

  const submitMessage = useCallback(
    async (userMessage: string, attachments?: Partial<FileObject>[]) => {
      dispatch({type: 'SET_STREAMING_MESSAGE', payload: getDefaultStreamingMessage()})
      dispatch({type: 'SET_LOADING', payload: true})
      messageId.current += 1
      dispatch({
        type: 'ADD_MESSAGE',
        payload: {
          id: messageId.current.toString(),
          role: 'user',
          content: userMessage,
          createdAt: new Date()
        }
      })

      try {
        const stream = await updateThread(assistantId, state.threadId, userMessage, attachments)
        const run = AssistantStream.fromReadableStream(stream)

        run.on('messageCreated', message => {
          dispatch({type: 'SET_THREAD_ID', payload: message.thread_id})
        })

        run.on('textDelta', (_, contentSnapshot) => {
          const newStreamingMessage = {
            ...state.streamingMessage,
            content: contentSnapshot.value
          }
          dispatch({
            type: 'SET_STREAMING_MESSAGE',
            payload: newStreamingMessage
          })
        })

        run.on('messageDone', message => {
          // Get the final message content
          const finalContent =
            message.content[0].type == 'text' ? message.content[0].text.value : ''

          messageId.current += 1
          dispatch({
            type: 'ADD_MESSAGE',
            payload: {
              id: messageId.current.toString(),
              role: 'assistant',
              content: finalContent,
              createdAt: new Date()
            }
          })
          dispatch({type: 'SET_LOADING', payload: false})
        })

        run.on('error', error => {
          console.error(error.message)
          dispatch({type: 'SET_ERROR', payload: error.message})
          dispatch({type: 'SET_LOADING', payload: false})
        })
      } catch (error) {
        if (error instanceof Error) {
          dispatch({type: 'SET_ERROR', payload: error.message})
        } else {
          dispatch({type: 'SET_ERROR', payload: 'An unknown error occurred'})
        }
        dispatch({type: 'SET_LOADING', payload: false})
      }
    },
    [state.threadId]
  )

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    threadId: state.threadId,
    submitMessage,
    setThreadId: (threadId: string) => dispatch({type: 'SET_THREAD_ID', payload: threadId})
  }
}
