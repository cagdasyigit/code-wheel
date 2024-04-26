export interface IAuthStore {
  isAuthenticated: boolean;
  token: string;
  authenticate: (token: string) => void;
}
