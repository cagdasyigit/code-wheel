import React from 'react';
import { act, render, renderHook } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import DataStore from './stores/DataStore';
import { IDataStore } from './stores/DataStore/types';

const renderComponent = () => {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe('<App/>', () => {
  it('should render the <App/>', () => {
    const app = renderComponent();
    expect(app).not.toBeNull();
  });

  it('should save the data state when leaving the page', () => {
    renderComponent();
    const keywords = 'test';
    const { result: dataStore } = renderHook(() => DataStore());

    act(() => {
      dataStore.current.setKeywords(keywords);
    });

    window.dispatchEvent(new Event('beforeunload'));
    const state = JSON.parse(
      localStorage.getItem('state') || '{}'
    ) as IDataStore;
    expect(state.keywords).toBe(keywords);
  });
});
