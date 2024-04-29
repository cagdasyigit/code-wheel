import { mockGitHubItem } from '../../tests/mocks/dataMocks';
import { act, renderHook, waitFor } from '@testing-library/react';
import useFetchData from './index';
import DataStore from '../../stores/DataStore';

jest.mock('axios', () => {
  return {
    __esModule: true,
    default: {
      get: () =>
        Promise.resolve({
          data: {
            ...mockGitHubItem,
          },
        }),
    },
  };
});

describe('useFetchData hook', () => {
  it('should fetch and set data to the store', async () => {
    const { result: dataStore } = renderHook(() => DataStore());

    await act(async () => {
      renderHook(() => useFetchData());
    });

    await waitFor(() => {
      expect(dataStore.current.list[0].description).toBe(
        mockGitHubItem.items[0].description
      );
    });
  });
});
