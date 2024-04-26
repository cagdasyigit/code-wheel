import axios from 'axios';
import { HttpRequest } from './types';
import AuthStore from '../../stores/AuthStore';

const MIDDLEWARE_URL = process.env.REACT_APP_MIDDLEWARE_URL;

const useHttpRequest = () => {
  const token = AuthStore((state) => state.token);

  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  const get = <R,>(url: string, params?: { [key: string]: string }[]) => {
    return axios.get<R>(url, {
      params,
      headers,
    });
  };

  const post = <P, R>(url: string, payload?: P) => {
    return axios.post<R>(url, payload, { headers });
  };

  return <P, R>(request: HttpRequest<P> | string) => {
    if (typeof request === 'string') {
      return get<R>(MIDDLEWARE_URL + request);
    }

    switch (request.method) {
      case 'GET':
        return get<R>(MIDDLEWARE_URL + request.path, request.params);
      case 'POST':
        return post<P, R>(MIDDLEWARE_URL + request.path, request.payload);
      default:
        return get<R>(MIDDLEWARE_URL + request.path, request.params);
    }
  };
};

export default useHttpRequest;
