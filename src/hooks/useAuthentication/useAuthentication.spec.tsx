import React from 'react';
import { mockGitHubUser } from '../../tests/mocks/dataMocks';
import { act, render, renderHook, waitFor } from '@testing-library/react';
import AuthStore from '../../stores/AuthStore';
import { BrowserRouter } from 'react-router-dom';
import Login from '../../components/Login';

jest.mock('axios', () => {
  return {
    __esModule: true,
    default: {
      get: () =>
        Promise.resolve({
          data: {
            ...mockGitHubUser,
          },
        }),
    },
  };
});

const renderComponent = () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
};

describe('useFetchData hook', () => {
  it('should fetch user if token exists', async () => {
    const { result: authStore } = renderHook(() => AuthStore());
    localStorage.setItem('token', 'token');

    await act(async () => {
      renderComponent();
    });

    await waitFor(() => {
      expect(authStore.current.isAuthenticated).toBeTruthy();
      expect(authStore.current.user?.name).toBe(mockGitHubUser.name);
    });
  });
});
