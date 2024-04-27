import { Data } from '../../components/DataTable/types';

export type Language = 'Javascript' | 'Scala' | 'Python';

export interface IDataStore {
  list: Data[];
  keywords: string;
  language: Language;
  pageSize: number;
  currentPage: number;
  order: 'asc' | 'desc';
  orderBy: string;
  totalCount: number;
  setList: (list: Data[], totalCount: number) => void;
  setKeywords: (keywords: string) => void;
  setLanguage: (language: Language) => void;
  setPageSize: (pageSize: number) => void;
  setCurrentPage: (currentPage: number) => void;
  setOrderBy: (order: string, orderBy: string) => void;
}