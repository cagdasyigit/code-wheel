import { Data } from '../../components/DataTable/types';

export interface IDataStore {
  list: Data[];
  keywords: string;
  language: 'Javascript' | 'Scala' | 'Python';
}
