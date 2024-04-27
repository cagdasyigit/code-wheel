import { useEffect, useState } from 'react';
import useHttpRequest from '../useHttpRequest';
import DataStore from '../../stores/DataStore';
import { mapSearchResultToData } from './utils';
import { SearchResult } from './types';

const useFetchData = () => {
  const httpRequest = useHttpRequest();
  const { language, keywords, currentPage, pageSize, order, orderBy, setList } =
    DataStore((state) => state);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = `?q=${keywords},${language}&page=${currentPage}&per_page=${pageSize}&sort=${orderBy}-${order}`;
    const url = `https://api.github.com/search/repositories${params}`;

    setLoading(true);
    httpRequest<unknown, SearchResult>(url)
      .then((response) => {
        setList(
          mapSearchResultToData(response.data),
          response.data.total_count
        );
      })
      .finally(() => setLoading(false));
  }, [keywords, language, currentPage, pageSize, orderBy]);

  return { loading };
};

export default useFetchData;
