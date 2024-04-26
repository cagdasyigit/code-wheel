import { create } from 'zustand';
import { IDataStore } from './types';

const DataStore = create<IDataStore>((set) => ({
  keywords: '',
  list: [],
  language: 'Javascript',
}));

export default DataStore;
