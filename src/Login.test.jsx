import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './components/Login';

describe('Login component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows error on invalid credentials and does not call onLogin or navigate', () => {
    const onLogin = jest.fn();
    const fakeNavigate = jest.fn();
    render(<Login onLogin={onLogin} navigate={fakeNavigate} />);

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: 'badpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(onLogin).not.toHaveBeenCalled();
    expect(fakeNavigate).not.toHaveBeenCalled();
    expect(screen.getByText(/Invalid credentials, please try again\./i)).toBeInTheDocument();
  });

  test('calls onLogin with "volunteer" when volunteer credentials provided', () => {
    const onLogin = jest.fn();
    const fakeNavigate = jest.fn();
    render(<Login onLogin={onLogin} navigate={fakeNavigate} />);

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'volunteer@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: 'password' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(onLogin).toHaveBeenCalledWith('volunteer');
    expect(fakeNavigate).toHaveBeenCalledWith('/profile');
    expect(screen.queryByText(/Invalid credentials/i)).toBeNull();
  });

  test('calls onLogin with "admin" when admin credentials provided', () => {
    const onLogin = jest.fn();
    const fakeNavigate = jest.fn();
    render(<Login onLogin={onLogin} navigate={fakeNavigate} />);

    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'admin@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: 'adminpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(onLogin).toHaveBeenCalledWith('admin');
    expect(fakeNavigate).toHaveBeenCalledWith('/create-event');
    expect(screen.queryByText(/Invalid credentials/i)).toBeNull();
  });

  test('email and password inputs are required by HTML', () => {
    const onLogin = jest.fn();
    const fakeNavigate = jest.fn();
    render(<Login onLogin={onLogin} navigate={fakeNavigate} />);

    const emailInput = screen.getByLabelText(/Email:/i);
    const passwordInput = screen.getByLabelText(/Password:/i);
    expect(emailInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('required');
  });
});
