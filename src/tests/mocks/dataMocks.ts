export const mockGitHubItem = {
  incomplete_results: false,
  items: [
    {
      id: 1,
      owner: {
        login: 'test-login',
      },
      description: 'test-desc',
      stargazers_count: 1,
      forks_count: 1,
      updated_at: '2024-04-29T02:05:18Z',
      svn_url: 'http://test',
    },
  ],
  total_count: 1,
};

export const mockHeaders = {
  params: undefined,
  headers: {
    Authorization: 'Bearer ',
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  },
};

export const mockGitHubUser = {
  login: 'cagdasyigit',
  id: 4467396,
  node_id: 'MDQ6VXNlcjQ0NjczOTY=',
  avatar_url: 'https://avatars.githubusercontent.com/u/4467396?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/cagdasyigit',
  html_url: 'https://github.com/cagdasyigit',
  followers_url: 'https://api.github.com/users/cagdasyigit/followers',
  following_url:
    'https://api.github.com/users/cagdasyigit/following{/other_user}',
  gists_url: 'https://api.github.com/users/cagdasyigit/gists{/gist_id}',
  starred_url:
    'https://api.github.com/users/cagdasyigit/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/cagdasyigit/subscriptions',
  organizations_url: 'https://api.github.com/users/cagdasyigit/orgs',
  repos_url: 'https://api.github.com/users/cagdasyigit/repos',
  events_url: 'https://api.github.com/users/cagdasyigit/events{/privacy}',
  received_events_url:
    'https://api.github.com/users/cagdasyigit/received_events',
  type: 'User',
  site_admin: false,
  name: 'Cagdas Yigit',
  company: null,
  blog: 'https://www.cagdasyigit.com',
  location: 'Munich',
  email: 'cagdasyigit34@gmail.com',
  hireable: null,
  bio: 'Experienced in all stages of the development cycle for dynamic web projects, offering advanced knowledge of Typescript and Java.',
  twitter_username: null,
  public_repos: 13,
  public_gists: 2,
  followers: 22,
  following: 3,
  created_at: '2013-05-18T21:34:16Z',
  updated_at: '2022-07-19T06:00:18Z',
};
