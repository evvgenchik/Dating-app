import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { JSX } from 'react/jsx-runtime';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthContext from '@/context/AuthProvider';

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

const providerUser = {
  id: '123',
  email: 'email@mail.ru',
  firstName: 'Ivan',
  birthday: '1998-12-12T00:00:00.000Z',
  gender: 'man',
  looking: 'wooman',
  descriptrion: 'Really cool and pretty',
  avatar: 'link',
  createdAt: new Date(),
  isEmailConfirmed: true,
  matchedBy: [],
  matching: [],
  dislikeBy: [],
  disliking: [],
  messageSent: [],
  messageRecieved: [],
  conversations: [],
};

const customRender = (ui: JSX.Element, user = providerUser) => {
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

const queryClientRender = (ui: JSX.Element, user = providerUser) => {
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </BrowserRouter>
  );
};

export { customRender, queryClientRender, providerUser };
