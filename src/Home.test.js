import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './components/Home';

test('renders home page title', () => {
  render(<Home />);
  const titles = screen.getAllByText(/The Kind Neighbors Initiative/i);
  expect(titles.length).toBeGreaterThan(0);
});
