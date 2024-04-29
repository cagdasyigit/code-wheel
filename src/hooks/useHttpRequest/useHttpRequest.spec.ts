import { renderHook } from '@testing-library/react';
import useHttpRequest from './index';
import { mockHeaders } from '../../tests/mocks/dataMocks';

const mockGet = jest.fn();

jest.mock('axios', () => {
  return {
    __esModule: true,
    default: {
      get: (url: string, config: any) => mockGet(url, config),
    },
  };
});

describe('useHttpRequest hook', () => {
  it('should integrate the headers when sending request', () => {
    const { result: httpRequest } = renderHook(() => useHttpRequest());
    httpRequest.current<unknown, string>('test');
    expect(mockGet).toHaveBeenCalledWith('undefinedtest', mockHeaders);
  });

  it('should not include middleware base url if "http" exists in given url', () => {
    const { result: httpRequest } = renderHook(() => useHttpRequest());
    httpRequest.current<unknown, string>('http://test');
    expect(mockGet).toHaveBeenCalledWith('http://test', mockHeaders);
  });
});
