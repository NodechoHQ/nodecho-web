import { z } from 'zod'

export type LoginResponse = {
  access_token: string
}

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  emailVerifiedAt: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>
