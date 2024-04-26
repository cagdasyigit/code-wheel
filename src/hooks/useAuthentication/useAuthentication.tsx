import { useNavigate, useSearchParams } from 'react-router-dom';
import useHttpRequest from '../useHttpRequest';
import { GithubAuthResponse } from './types';
import AuthStore from '../../stores/AuthStore';
import { useEffect, useState } from 'react';

const useAuthentication = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [params] = useSearchParams();
  const code = params.get('code');
  const navigate = useNavigate();
  const tokenInCache = localStorage.getItem('token');
  const httpRequest = useHttpRequest();

  const handleAfterLogin = (token: string) => {
    AuthStore.getState().authenticate(token);
    navigate('/home');
  };

  useEffect(() => {
    if (tokenInCache) {
      handleAfterLogin(tokenInCache);
    }

    if (code) {
      setLoading(true);

      httpRequest<unknown, GithubAuthResponse>(`/authenticateGitHub/${code}`)
        .then((result) => {
          const token = result.data.access_token;

          if (token) {
            localStorage.setItem('token', token);
            handleAfterLogin(token);
          } else if (result.data.error) {
            setError(result.data.error_description || '');
          }
        })
        .finally(() => setLoading(false));
    }
  }, []);

  return {
    loading,
    error,
  };
};

export default useAuthentication;
