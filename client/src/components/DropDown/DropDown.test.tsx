import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropDown from './DropDown';
import { BrowserRouter } from 'react-router-dom';
import AuthContext, { AuthProvider } from '@/context/authProvider';
import { JSX } from 'react/jsx-runtime';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import axios from 'axios';

const providerUser = {
  id: '123',
  email: 'email@mail.ru',
  firstName: 'Ivan',
  birthday: '1998-12-12T00:00:00.000Z',
  gender: 'man',
  looking: 'woman',
  descriptrion: 'Really cool and pretty',
  avatar: 'link',
  createdAt: '2023-07-09T09:57:46.780Z',
  isEmailConfirmed: 'true',
  matchedBy: [],
  matching: [],
  dislikeBy: [],
  disliking: [],
  messageSent: [],
  messageRecieved: [],
  conversations: [],
};

const setUser = vi.fn();
const refetch = vi.fn();
const queryClient = new QueryClient({
  logger: {
    log: console.log,
    warn: console.warn,
    error: () => {},
  },
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const customRender = (ui: JSX.Element, user) => {
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ user: user, setUser, refetch }}>
          {ui}
        </AuthContext.Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

// const wrapper = ({ children }) => (
//   <AuthProvider user={user}>{children}</AuthProvider>
// );

describe('DropDown', () => {
  it('render DropDown component', () => {
    customRender(<DropDown />, providerUser);

    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('show correct name', () => {
    customRender(<DropDown />, providerUser);

    expect(screen.getByText(providerUser.firstName)).toBeInTheDocument();
  });

  it('go to home page after logout', async () => {
    const user = userEvent.setup();

    customRender(<DropDown />, providerUser);
    expect(window.location.pathname).toEqual('/');

    screen.debug();

    await user.click(screen.getByText(/logout/i));
    expect(window.location.pathname).toEqual('/');
  });

  // it('go to profile page after on click', async () => {
  //   customRender(<DropDown />, providerUser);

  //   await userEvent.click(screen.getByText(/My Profile/i));
  //   expect(window.location.pathname).toEqual('/profile');
  // });

  // it('dropDonw visible after click', async () => {
  //   const user = userEvent.setup();
  //   customRender(<DropDown />, providerUser);

  //   const dropDownComponent = screen.getByRole('drowDown');
  //   const style = window.getComputedStyle(dropDownComponent);

  //   await user.click(screen.getByRole('img'));
  //   expect(style.visibility).toBe('visible');
  // });
});
