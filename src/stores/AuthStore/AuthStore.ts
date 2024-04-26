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
  logout: () =>
    set(() => ({
      isAuthenticated: false,
      token: '',
    })),
}));

export default AuthStore;
