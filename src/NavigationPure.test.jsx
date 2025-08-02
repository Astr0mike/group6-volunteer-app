import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { NavigationPure } from './__test_helpers__/NavigationPure';

test('shows register/login when logged out on home', () => {
  render(<NavigationPure isLoggedIn={false} role="" pathname="/" />);
  expect(screen.getByText(/Register/i)).toBeInTheDocument();
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});

test('shows volunteer links when role is volunteer', () => {
  render(<NavigationPure isLoggedIn={true} role="volunteer" pathname="/" />);
  expect(screen.getByText(/Profile/i)).toBeInTheDocument();
  expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
  expect(screen.getByText(/Events/i)).toBeInTheDocument();
});

test('logout button calls handler', () => {
  const onLogout = jest.fn();
  render(<NavigationPure isLoggedIn={true} role="volunteer" pathname="/" onLogout={onLogout} />);
  fireEvent.click(screen.getByText(/Logout/i));
  expect(onLogout).toHaveBeenCalled();
});
