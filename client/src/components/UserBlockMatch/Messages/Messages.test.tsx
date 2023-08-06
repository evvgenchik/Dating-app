import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Messages from './Messages';
import { customRender, providerUser } from '@/utils/test';
import { vi } from 'vitest';

vi.mock('@/hooks/useConversationsQuery', () => {
  return {
    useConversationsQuery: vi.fn().mockImplementation(() => {
      return {
        data: [
          {
            createdAt: new Date(),
            id: '123',
            messages: [
              {
                content: 'Hey there',
                conversationId: '123',
                createdAt: new Date(),
                id: '123',
                userAddressEmail: 'ivan@mail.ru',
                userSourceEmail: 'alina@mail.ru',
              },
            ],
            users: [
              {
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
              },
            ],
          },
        ],
        isLoading: false,
        isSuccess: true,
      };
    }),
  };
});

const conversation = providerUser.conversations[0];
const chatCompanion = conversation.users.find(
  ({ id }) => id !== providerUser.id
);

describe('Messages', () => {
  it('render Messages component with correct chat companion name and message', async () => {
    customRender(<Messages />);

    await waitFor(() =>
      expect(screen.getByText(chatCompanion.firstName)).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        screen.getByText(conversation.messages[0].content)
      ).toBeInTheDocument()
    );
  });

  it('navigation to messages on click', async () => {
    const user = userEvent.setup();
    customRender(<Messages />);

    const chatCompanionBlock = screen.getByText(chatCompanion.firstName);
    await user.click(chatCompanionBlock);

    expect(window.location.pathname).toEqual(
      `/app/message/${chatCompanion.id}`
    );
  });
});
