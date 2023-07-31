import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { customRender, providerUser } from '@/utils/test';
import { vi } from 'vitest';
import { UserLogin } from '@/utils/types';

class loginException extends Error {
  constructor() {
    super();
  }
  response = { status: 401 };
}

const defaultRender = () =>
  customRender(
    <Login
      modalActive={false}
      setModalActive={() => {}}
      setIsLoading={() => {}}
    />
  );

//vi.mock('@/api/axios');
vi.mock('@/api/services/authApi', () => {
  return {
    AuthApi: {
      login: vi.fn().mockImplementation(async (user: UserLogin) => {
        if (!user.email || !user.password) throw new loginException();
        return { data: providerUser };
      }),
    },
  };
});

describe('Login', () => {
  defaultRender();

  it('render Login component', () => {
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('validation on empty fields', async () => {
    const user = userEvent.setup();
    defaultRender();

    const btn = screen.getByText('Login');
    await user.click(btn);

    expect(
      screen.getByText(/Incorrect email or password/i)
    ).toBeInTheDocument();
  });

  it('validation on empty email', async () => {
    const user = userEvent.setup();
    defaultRender();

    const inputEmail = screen.getByPlaceholderText(/email/i);
    await user.type(inputEmail, 'mail@mail.ru');

    const btn = screen.getByText('Login');
    await user.click(btn);

    expect(
      screen.getByText(/Incorrect email or password/i)
    ).toBeInTheDocument();
  });

  it('validation on empty password', async () => {
    const user = userEvent.setup();
    defaultRender();

    const inputPassword = screen.getByPlaceholderText(/password/i);
    await user.type(inputPassword, '1111');

    const btn = screen.getByText('Login');
    await user.click(btn);

    expect(
      screen.getByText(/Incorrect email or password/i)
    ).toBeInTheDocument();
  });

  it('no error on correct login and password', async () => {
    const user = userEvent.setup();
    defaultRender();

    const inputPassword = screen.getByPlaceholderText(/password/i);
    await user.type(inputPassword, '1111');
    const inputEmail = screen.getByPlaceholderText(/email/i);
    await user.type(inputEmail, 'mail@mail.ru');

    const btn = screen.getByText('Login');
    await user.click(btn);

    expect(
      screen.queryByText(/Incorrect email or password/i)
    ).not.toBeInTheDocument();
  });

  it('show success msg with correct userName', async () => {
    const user = userEvent.setup();
    defaultRender();

    const inputPassword = screen.getByPlaceholderText(/password/i);
    await user.type(inputPassword, '1111');
    const inputEmail = screen.getByPlaceholderText(/email/i);
    await user.type(inputEmail, 'mail@mail.ru');

    const btn = screen.getByText('Login');
    await user.click(btn);

    expect(screen.getByText(/Welocome/i)).toBeInTheDocument();
    expect(screen.getByText(providerUser.firstName)).toBeInTheDocument();
  });

  it('sign up links direct to sign up page', async () => {
    const user = userEvent.setup();
    defaultRender();

    const link = screen.getByText(/Sign up/i);
    await user.click(link);

    expect(window.location.pathname).toEqual('/signup');
  });
});
