import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import Feedback from './Feedback';

describe('<Feedback/>', () => {
  it('should show feedback with message', () => {
    render(<Feedback open={true} message={'test'} />);
    const snackbar = screen.queryByText('test');
    expect(snackbar).not.toBeNull();
  });

  it('should close the snackbar when click on action item', async () => {
    render(<Feedback open={true} message={'test'} />);
    const actionItem = screen.queryByTestId('snackbar-action');
    expect(actionItem).not.toBeNull();

    act(() => {
      actionItem?.click();
    });

    await waitFor(() => {
      const snackbar = screen.queryByText('test');
      expect(snackbar).toBeNull();
    });
  });
});
