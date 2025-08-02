import React from 'react';
import { render, screen } from '@testing-library/react';
import Notifications from './components/Notifications';

describe('Notifications component', () => {
  test('renders headings and no new messages text', () => {
    render(<Notifications />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Notifications');
    expect(screen.getByText(/No new messages at this time\./i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Opened Messages');
  });

  test('lists all opened messages', () => {
    render(<Notifications />);
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(9);
    expect(screen.getByText(/Help wanted at charity event matches your skills!/i)).toBeInTheDocument();
    expect(screen.getByText(/please finsih account set-up in profile management/i)).toBeInTheDocument();
  });
});

