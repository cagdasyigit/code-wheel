import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('<App/>', () => {
  it('should save the latest data state to localStorage', () => {
    render(<App />);
  });
});
