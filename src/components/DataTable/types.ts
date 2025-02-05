import * as React from 'react';

export interface Data {
  id: number;
  username: string; // owner.login
  description: string;
  starsCount: number; // stargazers_count
  forksCount: number; // forks_count
  updateDate: string; // updated_at
  url: string;
}

export interface HeadCell {
  id: keyof Data;
  align: 'left' | 'right' | 'center';
  label: string;
  sort: boolean;
}

export type Order = 'asc' | 'desc';

export interface DataTableHeadProps {
  headCells: HeadCell[];
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: keyof Data;
}
