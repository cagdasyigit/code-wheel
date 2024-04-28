import { create } from 'zustand';
import { GitHubUser, type IAuthStore } from './types';

const AuthStore = create<IAuthStore>((set) => ({
  isAuthenticated: false,
  token: '',
  user: null,
  authenticate: (token) =>
    set(() => ({
      isAuthenticated: true,
      token,
    })),
  logout: () =>
    set(() => ({
      isAuthenticated: false,
      token: '',
      user: null,
    })),
  setUser: (user: GitHubUser) =>
    set(() => ({
      user,
    })),
}));

export default AuthStore;
