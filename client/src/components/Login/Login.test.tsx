import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { customRender } from '@/utils/test';
import { vi } from 'vitest';
import { UserLogin } from '@/utils/types';

class loginException extends Error {
  constructor() {
    super();
  }
  response = { status: 401 };
}

//vi.mock('@/api/axios');
vi.mock('@/api/services/authApi', () => {
  return {
    AuthApi: {
      login: vi.fn().mockImplementation((user: UserLogin) => {
        if (!user.email || !user.password) throw new loginException();
      }),
    },
  };
});

describe('Login', () => {
  it('render Login component', () => {
    customRender(
      <Login
        modalActive={false}
        setModalActive={() => {}}
        setIsLoading={() => {}}
      />
    );

    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it('validation on empty fields', async () => {
    const user = userEvent.setup();
    customRender(
      <Login
        modalActive={false}
        setModalActive={() => {}}
        setIsLoading={() => {}}
      />
    );

    const btn = screen.getByText('Login');
    await user.click(btn);

    expect(
      screen.getByText(/Incorrect email or password/i)
    ).toBeInTheDocument();
  });

  // it('validation on empty password', async () => {
  //   const user = userEvent.setup();
  //   customRender(
  //     <Login
  //       modalActive={false}
  //       setModalActive={() => {}}
  //       setIsLoading={() => {}}
  //     />
  //   );

  //   const btn = screen.getByPlaceholderText(/email/i);
  //   await user.type(btn);

  //   expect(
  //     screen.getByText(/Incorrect email or password/i)
  //   ).toBeInTheDocument();
  // });
});
