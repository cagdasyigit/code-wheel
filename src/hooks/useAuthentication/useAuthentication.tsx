import { useNavigate, useSearchParams } from 'react-router-dom';
import useHttpRequest from '../useHttpRequest';
import { GithubAuthResponse } from './types';
import AuthStore from '../../stores/AuthStore';
import { useEffect, useState } from 'react';
import { GitHubUser } from '../../stores/AuthStore/types';

const useAuthentication = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [params] = useSearchParams();
  const code = params.get('code');
  const navigate = useNavigate();
  const httpRequest = useHttpRequest();

  const getGitHubUser = () => {
    httpRequest<unknown, GitHubUser>('https://api.github.com/user')
      .then((response) => {
        AuthStore.getState().setUser(response.data);
        navigate('/home');
      })
      .catch((error) => {
        if (error.response.status === 401) {
          localStorage.setItem('token', '');
          AuthStore.getState().logout();
          navigate('/login');
        }
      })
      .finally(() => setLoading(false));
  };

  const handleToken = (token: string) => {
    AuthStore.getState().authenticate(token);
    getGitHubUser();
  };

  useEffect(() => {
    const tokenInCache = localStorage.getItem('token');

    if (code) {
      httpRequest<unknown, GithubAuthResponse>(
        `/authenticateGitHub/${code}`
      ).then((result) => {
        const token = result.data.access_token;

        if (token) {
          localStorage.setItem('token', token);
          handleToken(token);
        } else if (result.data.error) {
          setError(result.data.error_description || '');
        }
      });
    } else if (tokenInCache) {
      handleToken(tokenInCache);
    } else {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
  };
};

export default useAuthentication;
