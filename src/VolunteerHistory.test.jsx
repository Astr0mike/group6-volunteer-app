import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import VolunteerHistory from './components/VolunteerHistory';

// deterministic mock volunteer data
const mockVolunteer = {
  name: 'Jane Doe',
  status: 'Active',
  history: [
    {
      organization: 'Helping Hands',
      role: 'Coordinator',
      date: '2024-05-01',
      hours: 10,
    },
    {
      organization: 'Food Bank',
      role: 'Volunteer',
      date: '2024-06-15',
      hours: 5,
    },
  ],
};

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => mockVolunteer,
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('shows loading then renders volunteer history', async () => {
  render(<VolunteerHistory />);

  // initial loading state
  expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();

  // wait for the main heading to show that data has loaded
  expect(await screen.findByText(/Volunteer History/i)).toBeInTheDocument();

  // check volunteer name and status separately
  expect(screen.getByText(/Volunteer:/i)).toBeInTheDocument();
  expect(screen.getByText('Jane Doe')).toBeInTheDocument();

  expect(screen.getByText(/Status:/i)).toBeInTheDocument();
  expect(screen.getByText('Active')).toBeInTheDocument();

  // verify work history entries
  expect(screen.getByText(/Helping Hands/i)).toBeInTheDocument();
  expect(screen.getByText(/Coordinator/i)).toBeInTheDocument();
  expect(screen.getByText(/2024-05-01/i)).toBeInTheDocument();
  expect(screen.getByText(/10/i)).toBeInTheDocument();

  expect(screen.getByText(/Food Bank/i)).toBeInTheDocument();
  expect(screen.getByText(/Volunteer/i)).toBeInTheDocument();
  expect(screen.getByText(/2024-06-15/i)).toBeInTheDocument();
  expect(screen.getByText(/5/i)).toBeInTheDocument();
});

test('handles fetch failure gracefully', async () => {
  jest.restoreAllMocks();
  jest.spyOn(global, 'fetch').mockRejectedValue(new Error('network failure'));

  // suppress noisy error output
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  render(<VolunteerHistory />);

  // still shows loading initially
  expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();

  // ensure fetch was attempted
  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalled();
  });

  consoleSpy.mockRestore();
});
