export interface GitHubItem {
  id: number;
  owner: {
    login: string;
  };
  description: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  svn_url: string;
}

export interface SearchResult {
  total_count: number;
  items: GitHubItem[];
}
