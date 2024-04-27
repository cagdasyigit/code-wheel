import * as React from 'react';

export interface Data {
  id: number;
  username: string; // owner.login
  description: string;
  starsCount: number; // stargazers_count
  forksCount: number; // forks_count
  updateDate: string; // updated_at
}

export interface HeadCell {
  id: keyof Data;
  align: 'left' | 'right' | 'center';
  label: string;
}

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
  headCells: HeadCell[];
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
}
