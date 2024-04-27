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
      updateDate: new Date(item.updated_at).toLocaleString(),
      url: item.svn_url,
    })
  );

export const orderByKeyMap: { [key: string]: string } = {
  starsCount: 'stars',
  forksCount: 'forks',
  updateDate: 'updated',
};
