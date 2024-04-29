import { useCallback, useEffect, useState } from 'react';
import useHttpRequest from '../useHttpRequest';
import DataStore from '../../stores/DataStore';
import { mapSearchResultToData, orderByKeyMap } from './utils';
import { SearchResult } from './types';
import { debounce } from '@mui/material';
import { Language } from '../../stores/DataStore/types';

export const DEBOUNCE_TIMEOUT = 500;

const useFetchData = () => {
  const httpRequest = useHttpRequest();
  const { language, keywords, currentPage, pageSize, order, orderBy, setList } =
    DataStore((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetch = (
    language: Language,
    keywords: string,
    currentPage: number,
    pageSize: number,
    order: 'asc' | 'desc',
    orderBy: string
  ) => {
    const query = `${keywords.split(' ').join(',')},${language}`;
    const params = `?q=${query}&page=${currentPage + 1}&per_page=${pageSize}&sort=${orderByKeyMap[orderBy]}&order=${order}`;
    const url = `https://api.github.com/search/repositories${params}`;

    setLoading(true);
    httpRequest<unknown, SearchResult>(url)
      .then((response) => {
        setList(
          mapSearchResultToData(response.data),
          response.data.total_count
        );
      })
      .catch((error) => {
        setError(error);
        setList([], 0);
      })
      .finally(() => setLoading(false));
  };

  const debounceFetch = useCallback(
    debounce(
      (language, keywords, currentPage, pageSize, order, orderBy) =>
        fetch(language, keywords, currentPage, pageSize, order, orderBy),
      DEBOUNCE_TIMEOUT
    ),
    []
  );

  useEffect(() => {
    debounceFetch(language, keywords, currentPage, pageSize, order, orderBy);
  }, [keywords, language, currentPage, pageSize, order, orderBy]);

  return { loading, error };
};

export default useFetchData;
