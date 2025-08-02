import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserProfile from './components/UserProfile';

beforeAll(() => {
  // stub alert so it doesn't blow up in jsdom
  global.alert = jest.fn();
});

// Stub the date picker for predictability
jest.mock('react-multi-date-picker', () => {
  return ({ multiple, value, onChange }) => (
    <div data-testid="mock-date-picker">
      <button onClick={() => onChange(['2025-08-07'])}>Add Availability</button>
      <div>Selected: {Array.isArray(value) ? value.join(',') : ''}</div>
    </div>
  );
});

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

function getByName(container, name) {
  return container.querySelector(`[name="${name}"]`);
}

test('submits user profile successfully', async () => {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ message: 'User profile created successfully!' }),
  });

  const { container } = render(<UserProfile />);

  // Fill required fields by name attribute
  userEvent.type(getByName(container, 'username'), 'testuser');
  userEvent.type(getByName(container, 'fullName'), 'Test User');
  userEvent.type(getByName(container, 'address1'), '123 Main St');
  userEvent.type(getByName(container, 'city'), 'Austin');
  userEvent.selectOptions(getByName(container, 'state'), 'TX');
  userEvent.type(getByName(container, 'zip'), '78701');

  // Skills dropdown: open and check some boxes
  userEvent.click(screen.getByText(/Select skills/i));
  const firstAidCheckbox = screen.getByLabelText('First Aid');
  const publicSpeakingCheckbox = screen.getByLabelText('Public Speaking');
  userEvent.click(firstAidCheckbox);
  userEvent.click(publicSpeakingCheckbox);

  // Add availability
  userEvent.click(screen.getByText('Add Availability'));

  // Submit
  userEvent.click(screen.getByRole('button', { name: /Submit Profile/i }));

  // Wait for success message
  await waitFor(() => {
    expect(screen.getByText(/Profile submitted successfully!/i)).toBeInTheDocument();
  });

  // Verify fetch call
  expect(global.fetch).toHaveBeenCalledWith(
    '/api/user-profiles',
    expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
  );

  // Inspect payload
  const body = JSON.parse(global.fetch.mock.calls[0][1].body);
  expect(body.username).toBe('testuser');
  expect(body.skills).toEqual(expect.arrayContaining(['First Aid', 'Public Speaking']));
  expect(body.availability).toEqual(['2025-08-07']);
});

test('alerts when required fields are missing', async () => {
  const { container } = render(<UserProfile />);

  const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  // Submit without filling anything
  userEvent.click(screen.getByRole('button', { name: /Submit Profile/i }));

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith('Please fill out all required fields correctly.');
  });

  alertSpy.mockRestore();
});
