import { HeadCell } from './types';

export const dataTableHeadCells: HeadCell[] = [
  {
    id: 'id',
    align: 'center',
    label: 'ID',
  },
  {
    id: 'username',
    align: 'left',
    label: 'Username',
  },
  {
    id: 'description',
    align: 'center',
    label: 'Description',
  },
  {
    id: 'starsCount',
    align: 'left',
    label: 'Stars',
  },
  {
    id: 'forksCount',
    align: 'left',
    label: 'Forks',
  },
  {
    id: 'updateDate',
    align: 'right',
    label: 'Update Date',
  },
];
