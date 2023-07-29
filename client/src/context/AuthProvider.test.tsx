import { render, screen } from '@testing-library/react';
import AuthContext, { AuthProvider } from './AuthProvider';
import { queryClientRender } from '@/utils/test';

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

describe('AuthProvider', () => {
  it('AuthProvider provide correct value', () => {
    const { getByText } = queryClientRender(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => <span>Is logged in: {value.toString()}</span>}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    expect(getByText('Is logged in: b')).toBeTruthy();
  });
});
