import axios from 'axios';
import { HttpRequest } from './types';
import AuthStore from '../../stores/AuthStore';

const MIDDLEWARE_URL = process.env.REACT_APP_MIDDLEWARE_URL;

const useHttpRequest = () => {
  const getHeaders = () => {
    const token = AuthStore.getState().token;

    return {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
  };

  const get = <R,>(url: string, params?: { [key: string]: string }[]) => {
    return axios.get<R>(url, {
      params,
      headers: getHeaders(),
    });
  };

  const post = <P, R>(url: string, payload?: P) => {
    return axios.post<R>(url, payload, { headers: getHeaders() });
  };

  const getUrl = (param: string): string => {
    return param.includes('http') ? param : MIDDLEWARE_URL + param;
  };

  return <P, R>(request: HttpRequest<P> | string) => {
    if (typeof request === 'string') {
      return get<R>(getUrl(request));
    }

    switch (request.method) {
      case 'GET':
        return get<R>(getUrl(request.path), request.params);
      case 'POST':
        return post<P, R>(getUrl(request.path), request.payload);
      default:
        return get<R>(getUrl(request.path), request.params);
    }
  };
};

export default useHttpRequest;
