import { HeadCell } from '../DataTable/types';

export const dataTableHeadCells: HeadCell[] = [
  {
    id: 'id',
    disablePadding: true,
    label: 'Repository ID',
  },
  {
    id: 'username',
    disablePadding: false,
    label: 'Username',
  },
  {
    id: 'description',
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'starsCount',
    disablePadding: false,
    label: 'Stars',
  },
  {
    id: 'forksCount',
    disablePadding: false,
    label: 'Forks',
  },
  {
    id: 'updateDate',
    disablePadding: false,
    label: 'Update Date',
  },
];
