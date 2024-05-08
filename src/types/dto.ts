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

export const ServerSchema = z.object({
  id: z.number(),
  token: z.string().uuid(),
  name: z.string(),
  ownerId: z.number(),
  dataLossAlertEnabled: z.boolean(),
  missedDataThreshold: z.number(),
  additionalPingCheckEnabled: z.boolean(),
  resourceUsageAlertEnabled: z.boolean(),
  systemLoadThreshold: z.number(),
  ramUsageThreshold: z.number(),
  diskUsageThreshold: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Server = z.infer<typeof ServerSchema>
