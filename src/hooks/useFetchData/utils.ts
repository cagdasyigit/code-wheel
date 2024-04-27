import { Data } from '../../components/DataTable/types';
import { SearchResult } from './types';

export const mapSearchResultToData = (result: SearchResult): Data[] =>
  result.items.map(
    (item): Data => ({
      id: item.id,
      username: item.owner.login,
      description: item.description,
      starsCount: item.stargazers_count,
      forksCount: item.forks_count,
      updateDate: item.updated_at,
    })
  );
