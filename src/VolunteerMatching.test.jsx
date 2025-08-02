import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// mock axios before importing the component that uses it
jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));
import axios from 'axios';

import VolunteerMatching from './components/VolunteerMatching';

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(window, 'alert').mockImplementation(() => {}); // suppress real alerts
});

afterAll(() => {
  window.alert.mockRestore();
});

const mockResponse = {
  data: {
    volunteers: [
      { id: 1, name: 'Alice', skills: 'Leadership', distance: 5 },
      { id: 2, name: 'Bob', skills: 'Communication', distance: 10 },
    ],
    events: [
      {
        id: 101,
        name: 'Park Cleanup',
        location: 'Central Park',
        type: 'environmental',
        urgency: 'High',
        distance: 3,
      },
    ],
  },
};

describe('VolunteerMatching component', () => {
  test('renders and displays "no volunteers/opportunities" before fetch resolves', async () => {
    axios.get.mockResolvedValueOnce({ data: { volunteers: [], events: [] } });

    render(<VolunteerMatching />);

    expect(screen.getByText(/Match volunteers with current opportunities/i)).toBeInTheDocument();
    expect(screen.getByText(/No volunteers found\./i)).toBeInTheDocument();
    expect(screen.getByText(/No opportunities found\./i)).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        'http://localhost:3001/api/volunteer-matching/match',
        expect.objectContaining({ params: { skill: '', distance: '', type: '' } })
      );
    });
  });

  test('fetches and shows volunteers and events', async () => {
    axios.get.mockResolvedValueOnce(mockResponse);

    render(<VolunteerMatching />);

    expect(await screen.findByText(/Alice - Leadership, 5 mi/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob - Communication, 10 mi/i)).toBeInTheDocument();

    expect(
      screen.getByText(/Event ID 101: Park Cleanup - Central Park, environmental,/i)
    ).toBeInTheDocument();
  });

  test('updates filters and refetches with new params', async () => {
    axios.get.mockResolvedValueOnce(mockResponse);
    render(<VolunteerMatching />);

    await screen.findByText(/Alice - Leadership, 5 mi/i);

    axios.get.mockResolvedValueOnce({
      data: {
        volunteers: [{ id: 3, name: 'Carol', skills: 'Planning', distance: 2 }],
        events: [],
      },
    });

    fireEvent.change(screen.getByLabelText(/Skill:/i), { target: { value: 'Planning' } });

    await waitFor(() => {
      expect(axios.get).toHaveBeenLastCalledWith(
        'http://localhost:3001/api/volunteer-matching/match',
        expect.objectContaining({ params: { skill: 'Planning', distance: '', type: '' } })
      );
    });

    expect(await screen.findByText(/Carol - Planning, 2 mi/i)).toBeInTheDocument();
  });

  test('can select and deselect volunteers via checkboxes', async () => {
    axios.get.mockResolvedValueOnce(mockResponse);
    render(<VolunteerMatching />);

    const aliceLabel = await screen.findByLabelText(/Alice - Leadership, 5 mi/i);
    fireEvent.click(aliceLabel); // select

    const notifyBtn = screen.getByRole('button', { name: /Notify Selected Volunteers/i });
    expect(notifyBtn).not.toBeDisabled();

    fireEvent.click(aliceLabel); // deselect
    expect(notifyBtn).toBeDisabled();
  });

  test('calls notify endpoint and shows alert on success', async () => {
    axios.get.mockResolvedValueOnce(mockResponse);
    axios.post.mockResolvedValueOnce({
      data: {
        notified: [{ volunteer: 'Alice' }, { volunteer: 'Bob' }],
      },
    });

    render(<VolunteerMatching />);

    const aliceLabel = await screen.findByLabelText(/Alice - Leadership, 5 mi/i);
    const bobLabel = screen.getByLabelText(/Bob - Communication, 10 mi/i);
    fireEvent.click(aliceLabel);
    fireEvent.click(bobLabel);

    const notifyBtn = screen.getByRole('button', { name: /Notify Selected Volunteers/i });
    fireEvent.click(notifyBtn);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3001/api/volunteer-matching/notify',
        { volunteerIds: [1, 2] }
      );
    });

    expect(window.alert).toHaveBeenCalledWith('You have notified Alice, Bob');
  });

  test('shows error alert when notify fails', async () => {
    axios.get.mockResolvedValueOnce(mockResponse);
    axios.post.mockRejectedValueOnce(new Error('network error'));

    render(<VolunteerMatching />);

    const aliceLabel = await screen.findByLabelText(/Alice - Leadership, 5 mi/i);
    fireEvent.click(aliceLabel);

    const notifyBtn = screen.getByRole('button', { name: /Notify Selected Volunteers/i });
    fireEvent.click(notifyBtn);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        'An error occurred while notifying the volunteers. Please try again.'
      );
    });
  });
});
