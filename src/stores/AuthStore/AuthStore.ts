import { create } from 'zustand';
import { type IAuthStore } from './types';

const AuthStore = create<IAuthStore>((set) => ({
  isAuthenticated: false,
  token: '',
  authenticate: (token) =>
    set(() => ({
      isAuthenticated: true,
      token,
    })),
}));

export default AuthStore;
