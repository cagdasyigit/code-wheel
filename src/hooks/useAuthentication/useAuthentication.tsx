import { useNavigate, useSearchParams } from 'react-router-dom';
import useHttpRequest from '../useHttpRequest';
import { GithubAuthResponse } from './types';
import AuthStore from '../../stores/AuthStore';
import { useEffect } from 'react';

const useAuthentication = () => {
  const [params] = useSearchParams();
  const code = params.get('code');
  const navigate = useNavigate();
  const tokenInCache = localStorage.getItem('token');
  const httpRequest = useHttpRequest();

  const handleAfterLogin = (token: string) => {
    AuthStore.getState().authenticate(token);
    navigate('/home');
  };

  if (tokenInCache) {
    handleAfterLogin(tokenInCache);
  }

  useEffect(() => {
    if (code) {
      httpRequest<unknown, GithubAuthResponse>(
        `/authenticateGitHub/${code}`
      ).then((result) => {
        const token = result.data.access_token;

        if (token) {
          localStorage.setItem('token', token);
          handleAfterLogin(token);
        } else if (result.data.error) {
          alert(result.data.error_description);
        }
      });
    }
  }, []);
};

export default useAuthentication;
