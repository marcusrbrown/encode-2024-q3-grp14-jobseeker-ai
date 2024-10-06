import {z} from 'zod'

export const imageSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'Image must be 5MB or less.'
    })
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      {
        message: 'Only .jpg, .png, and .webp files are allowed.'
      }
    )
})

export type ImageFormData = z.infer<typeof imageSchema>
