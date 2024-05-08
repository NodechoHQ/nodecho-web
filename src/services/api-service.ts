import { LocalStorageKeys } from '@/lib/constants'
import {
  LoginResponse,
  Server,
  ServerSchema,
  User,
  UserSchema,
} from '@/types/dto'
import axios from 'axios'
import { z } from 'zod'

const apiClient = axios.create({ baseURL: '/api' })

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// MARK: - Auth

type RegisterParams = {
  name: string
  email: string
  password: string
}

export async function register(params: RegisterParams) {
  const { data } = await apiClient.post('/auth/register', {
    name: params.name,
    email: params.email,
    password: params.password,
  })
  return data
}

export async function sendVerificationEmail() {
  await apiClient.post('/auth/send-verification-email')
}

export async function verifyToken(token: string) {
  await apiClient.post('/auth/verify', { token })
}

type LoginParams = {
  email: string
  password: string
}

export async function login(params: LoginParams): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/auth/login', {
    email: params.email,
    password: params.password,
  })
  return data
}

export async function fetchProfile(): Promise<User> {
  const { data } = await apiClient.get('/auth/profile')
  const user = UserSchema.parse(data)
  return user
}

// MARK: - Servers

type CreateServerParams = {
  name: string
  dataLossAlertEnabled: boolean
  missedDataThreshold: number
  additionalPingCheck: boolean
  resourceUsageAlertEnabled: boolean
  systemLoadThreshold: number
  memoryUsageThreshold: number
  diskUsageThreshold: number
}

export async function createServer(
  params: CreateServerParams,
): Promise<Server> {
  const { data } = await apiClient.post('/servers', params)
  console.log('createServer response data', data)
  return ServerSchema.parse(data)
}

export async function fetchServers(): Promise<Server[]> {
  const { data } = await apiClient.get('/servers')
  console.log('fetchServers response data', JSON.stringify(data, null, 2))
  return z.array(ServerSchema).parse(data)
}

export async function fetchServer(id: number): Promise<Server> {
  const { data } = await apiClient.get(`/servers/${id}`)
  console.log('fetchServer response data', data)
  return ServerSchema.parse(data)
}

export async function updateServer(
  id: number,
  params: Partial<CreateServerParams>,
): Promise<Server> {
  const { data } = await apiClient.patch(`/servers/${id}`, params)
  console.log('updateServer response data', data)
  return ServerSchema.parse(data)
}

export async function deleteServer(id: number) {
  const { data } = await apiClient.delete(`/servers/${id}`)
  console.log('deleteServer response data', data)
}
