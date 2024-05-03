import { LocalStorageKeys } from '@/lib/constants'
import { LoginResponse, User, UserSchema } from '@/types/dto'
import axios from 'axios'

const apiClient = axios.create({ baseURL: '/api' })

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN)
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

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
