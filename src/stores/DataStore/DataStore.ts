import { create } from 'zustand';
import { IDataStore, Language } from './types';
import { Data, Order } from '../../components/DataTable/types';
import { initialValues } from './utils';

const DataStore = create<IDataStore>((set) => ({
  ...initialValues,
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
  setOrderBy: (order: Order, orderBy: keyof Data) =>
    set(() => ({
      order,
      orderBy,
    })),
}));

export default DataStore;
