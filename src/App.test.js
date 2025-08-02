import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Tell Jest to use the manual mock for react-router-dom
jest.mock('react-router-dom');

// Stub child components
jest.mock('./components/Home', () => () => <div data-testid="home">Home</div>);
jest.mock('./components/VolunteerHistory', () => () => <div data-testid="vol-history">Volunteer History</div>);
jest.mock('./components/VolunteerMatching', () => () => <div data-testid="vol-matching">Volunteer Matching</div>);
jest.mock('./components/Notifications', () => () => <div data-testid="notifications">Notifications</div>);
jest.mock('./components/EventManagementForm', () => () => <div data-testid="create-event">Create Event</div>);
jest.mock('./components/UserProfile', () => () => <div data-testid="profile">Profile</div>);
jest.mock('./components/Register', () => () => <div data-testid="register">Register</div>);
jest.mock('./components/Login', () => (props) => (
  <div data-testid="login">
    <button onClick={() => props.onLogin('volunteer')}>Login as Volunteer</button>
    <button onClick={() => props.onLogin('admin')}>Login as Admin</button>
  </div>
));

describe('App without real react-router-dom', () => {
  test('shows register and login when not logged in', () => {
    render(<App />);

    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByTestId('home')).toBeInTheDocument();
  });

  test('volunteer login shows volunteer links and profile', () => {
    render(<App />);

    // click login (mock)
    fireEvent.click(screen.getByText(/Login/i));
    fireEvent.click(screen.getByText(/Login as Volunteer/i));

    expect(screen.getByText(/Profile/i)).toBeInTheDocument();
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();
    expect(screen.getByText(/Events/i)).toBeInTheDocument();

    // simulate clicking profile link
    fireEvent.click(screen.getByText(/Profile/i));
    expect(screen.getByTestId('profile')).toBeInTheDocument();
  });

  test('admin login shows admin links and create-event view', () => {
    render(<App />);

    fireEvent.click(screen.getByText(/Login/i));
    fireEvent.click(screen.getByText(/Login as Admin/i));

    expect(screen.getByText(/Create Event/i)).toBeInTheDocument();
    expect(screen.getByText(/Volunteer matching/i)).toBeInTheDocument();
    expect(screen.getByText(/Volunteer History/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Create Event/i));
    expect(screen.getByTestId('create-event')).toBeInTheDocument();
  });

  test('logout resets to unauthenticated', () => {
    render(<App />);

    // login volunteer
    fireEvent.click(screen.getByText(/Login/i));
    fireEvent.click(screen.getByText(/Login as Volunteer/i));

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Logout/i));

    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});
