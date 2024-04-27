import { Language } from './types';
import { Data, Order } from '../../components/DataTable/types';

const savedState = JSON.parse(localStorage.getItem('state') || '{}');

export const initialValues = {
  keywords: savedState.keywords || '',
  list: savedState.list || [],
  language: savedState.language || ('Javascript' as Language),
  pageSize: savedState.pageSize || 10,
  currentPage: savedState.currentPage || 0,
  order: savedState.order || ('desc' as Order),
  orderBy: savedState.orderBy || ('updateDate' as keyof Data),
  totalCount: savedState.totalCount || 0,
};
