import { create } from 'zustand';
import { IDataStore, Language } from './types';
import { Data } from '../../components/DataTable/types';

const DataStore = create<IDataStore>((set) => ({
  keywords: '',
  list: [],
  language: 'Javascript',
  pageSize: 5,
  currentPage: 0,
  order: 'asc',
  orderBy: 'name',
  totalCount: 0,
  setKeywords: (keywords: string) =>
    set(() => ({
      keywords,
    })),
  setList: (list: Data[], totalCount: number) =>
    set(() => ({
      list,
      totalCount,
    })),
  setLanguage: (language: Language) =>
    set(() => ({
      language,
    })),
  setPageSize: (pageSize: number) =>
    set(() => ({
      pageSize,
    })),
  setCurrentPage: (currentPage: number) =>
    set(() => ({
      currentPage,
    })),
  setOrderBy: (order: string, orderBy: string) =>
    set(() => ({
      orderBy,
    })),
}));

export default DataStore;
