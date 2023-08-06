import { vi } from 'vitest';
import { render } from '@testing-library/react';
import { JSX } from 'react/jsx-runtime';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthContext from '@/context/AuthProvider';
import { ConversationType, MessageType, UserType } from './types';

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

const matchingUser: UserType = {
  id: '234',
  email: 'alina@mail.ru',
  firstName: 'Alina',
  birthday: '1998-12-12T00:00:00.000Z',
  gender: 'wooman',
  looking: 'man',
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

const messageToUser: MessageType = {
  content: 'Hey there',
  conversationId: '123',
  createdAt: new Date(),
  id: '123',
  userAddressEmail: 'ivan@mail.ru',
  userSourceEmail: 'alina@mail.ru',
};

const coversationUser: ConversationType = {
  createdAt: new Date(),
  id: '123',
  messages: [messageToUser],
  users: [matchingUser],
};

const providerUser: UserType = {
  id: '123',
  email: 'ivan@mail.ru',
  firstName: 'Ivan',
  birthday: '1998-12-12T00:00:00.000Z',
  gender: 'man',
  looking: 'wooman',
  descriptrion: 'Really cool and pretty',
  avatar: 'link',
  createdAt: new Date(),
  isEmailConfirmed: true,
  matchedBy: [],
  matching: [
    {
      id: '456',
      createdAt: new Date(),
      userAddress: matchingUser,
      userAddressAnswer: true,
      userAddressEmail: matchingUser.email,
      userSourceEmail: 'ivan@mail.ru',
    },
  ],
  dislikeBy: [],
  disliking: [],
  messageSent: [],
  messageRecieved: [],
  conversations: [coversationUser],
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

export {
  customRender,
  queryClientRender,
  providerUser,
  matchingUser,
  coversationUser,
};
