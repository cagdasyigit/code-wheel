export interface HttpRequest<T> {
  method: 'GET' | 'POST' | undefined;
  path: string;
  payload?: T;
  params?: { [key: string]: string }[];
}
