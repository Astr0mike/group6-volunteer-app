import React from 'react';

export function NavigationPure({ isLoggedIn, role, onLogout, pathname }) {
  if (!isLoggedIn && pathname === '/') {
    return (
      <nav>
        <span>Register</span>
        <span>Login</span>
      </nav>
    );
  }
  return (
    <nav>
      {role === 'volunteer' && (
        <>
          <span>Profile</span>
          <span>Notifications</span>
          <span>Events</span>
        </>
      )}
      {role === 'admin' && (
        <>
          <span>Create Event</span>
          <span>Volunteer matching</span>
          <span>Volunteer History</span>
        </>
      )}
      {(pathname === '/login' || pathname === '/register') && <span>Back</span>}
      {(pathname !== '/login' && pathname !== '/register') && (
        <button onClick={onLogout}>Logout</button>
      )}
    </nav>
  );
}