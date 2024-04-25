import { create } from 'zustand'
import { type IAuthStore } from './types'

const AuthStore = create<IAuthStore>(() => ({
  isAuthenticated: false,
}))

export default AuthStore
