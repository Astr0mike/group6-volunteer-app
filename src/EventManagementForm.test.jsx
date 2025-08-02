import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EventManagementForm from './components/EventManagementForm';

const successResponse = {
  message: 'Event created!',
};
const failureResponse = {
  errors: {
    eventName: 'Bad name',
  },
};

beforeEach(() => {
  jest.restoreAllMocks();
  // stub alert so tests don't pop up dialogs
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders all form fields', () => {
  render(<EventManagementForm />);

  expect(screen.getByLabelText(/Event Name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Event Description/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/^Location/i)).toBeInTheDocument();
  expect(screen.getByText(/Select Skills/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Urgency/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Event Date/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Create Event/i })).toBeInTheDocument();
});

test('shows validation errors when submitting empty form', async () => {
  render(<EventManagementForm />);

  fireEvent.click(screen.getByRole('button', { name: /Create Event/i }));

  await waitFor(() => {
    expect(screen.getByText(/Event Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Event Description is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Location is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Please select at least one skill/i)).toBeInTheDocument();
    expect(screen.getByText(/Please select urgency level/i)).toBeInTheDocument();
    expect(screen.getByText(/Please pick a date for the event/i)).toBeInTheDocument();
  });
});

test('allows selecting required skills via dropdown', async () => {
  render(<EventManagementForm />);

  // open dropdown
  fireEvent.click(screen.getByRole('button', { name: /Select Skills/i }));

  // select a skill checkbox
  const leadershipCheckbox = screen.getByLabelText(/Leadership/i).querySelector('input[type=checkbox]');
  expect(leadershipCheckbox).toBeInTheDocument();
  fireEvent.click(leadershipCheckbox);

  // dropdown button should reflect selection
  expect(screen.getByText(/Selected: Leadership/i)).toBeInTheDocument();
});

test('submits successfully when form is valid', async () => {
  // mock fetch to succeed
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: true,
    json: async () => successResponse,
  });

  render(<EventManagementForm />);

  // fill out form
  fireEvent.change(screen.getByLabelText(/Event Name/i), { target: { value: 'My Event' } });
  fireEvent.change(screen.getByLabelText(/Event Description/i), { target: { value: 'Desc' } });
  fireEvent.change(screen.getByLabelText(/^Location/i), { target: { value: 'Somewhere' } });

  // skills
  fireEvent.click(screen.getByRole('button', { name: /Select Skills/i }));
  const planningCheckbox = screen.getByLabelText(/Planning/i).querySelector('input[type=checkbox]');
  fireEvent.click(planningCheckbox);

  // urgency
  fireEvent.change(screen.getByLabelText(/Urgency/i), { target: { value: 'High' } });

  // date: pick today or future date
  const dateInput = screen.getByLabelText(/Event Date/i);
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1);
  const isoDate = futureDate.toISOString().split('T')[0];
  fireEvent.change(dateInput, { target: { value: isoDate } });

  // submit
  fireEvent.click(screen.getByRole('button', { name: /Create Event/i }));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/api/events', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: expect.any(String),
    }));
    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('Event Created') || expect.any(String));
  });

  // after success the form should be cleared (event name input empty)
  expect(screen.getByLabelText(/Event Name/i)).toHaveValue('');
});

test('displays server-side errors when response is not ok', async () => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce({
    ok: false,
    json: async () => failureResponse,
  });

  render(<EventManagementForm />);

  // fill minimal required fields to bypass validation except eventName to trigger server error
  fireEvent.change(screen.getByLabelText(/Event Name/i), { target: { value: 'X'.repeat(10) } });
  fireEvent.change(screen.getByLabelText(/Event Description/i), { target: { value: 'Desc' } });
  fireEvent.change(screen.getByLabelText(/^Location/i), { target: { value: 'Somewhere' } });

  fireEvent.click(screen.getByRole('button', { name: /Select Skills/i }));
  const teamworkCheckbox = screen.getByLabelText(/Teamwork/i).querySelector('input[type=checkbox]');
  fireEvent.click(teamworkCheckbox);

  fireEvent.change(screen.getByLabelText(/Urgency/i), { target: { value: 'Low' } });

  const dateInput = screen.getByLabelText(/Event Date/i);
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 2);
  fireEvent.change(dateInput, { target: { value: futureDate.toISOString().split('T')[0] } });

  fireEvent.click(screen.getByRole('button', { name: /Create Event/i }));

  await waitFor(() => {
    expect(screen.getByText(/Bad name/i)).toBeInTheDocument();
  });
});

test('handles network failure gracefully', async () => {
  jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('network error'));

  render(<EventManagementForm />);

  // fill required fields minimally to attempt submission
  fireEvent.change(screen.getByLabelText(/Event Name/i), { target: { value: 'Event' } });
  fireEvent.change(screen.getByLabelText(/Event Description/i), { target: { value: 'Desc' } });
  fireEvent.change(screen.getByLabelText(/^Location/i), { target: { value: 'Location' } });

  fireEvent.click(screen.getByRole('button', { name: /Select Skills/i }));
  const technicalCheckbox = screen.getByLabelText(/Technical/i).querySelector('input[type=checkbox]');
  fireEvent.click(technicalCheckbox);

  fireEvent.change(screen.getByLabelText(/Urgency/i), { target: { value: 'Medium' } });

  const dateInput = screen.getByLabelText(/Event Date/i);
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 3);
  fireEvent.change(dateInput, { target: { value: futureDate.toISOString().split('T')[0] } });

  fireEvent.click(screen.getByRole('button', { name: /Create Event/i }));

  await waitFor(() => {
    expect(window.alert).toHaveBeenCalledWith(
      expect.stringContaining('An error occurred while creating the event')
    );
  });
});
