export interface IAuthStore {
  isAuthenticated: boolean;
  token: string;
  user: GitHubUser | null;
  authenticate: (token: string) => void;
  logout: () => void;
  setUser: (user: GitHubUser) => void;
}

export interface GitHubUser {
  id: number;
  name: string;
  login: string;
  email: string;
  html_url: string;
  avatar_url: string;
}
