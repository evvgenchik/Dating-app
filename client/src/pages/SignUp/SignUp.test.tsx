import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { customRender, providerUser, queryClientRender } from '@/utils/test';
import { vi } from 'vitest';
import { UserLogin } from '@/utils/types';
import SignUp from './SignUp';

const defaultRender = () => queryClientRender(<SignUp />);

// const AMOUNTOFFIELDS = 8;
// const validateErrorMsg = (field: string) => `${field} is required`;

// vi.mock('@/api/services/authApi', () => {
//   return {
//     AuthApi: {
//       login: vi.fn().mockImplementation(async (user: UserLogin) => {
//         if (!user.email || !user.password) throw new loginException();
//         return { data: providerUser };
//       }),
//     },
//   };
// });

describe('SignUp create', () => {
  defaultRender();

  it('render SignUp page with correct word "Update"', () => {
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });

  it('trigger all validation errors on empty fields', async () => {
    const user = userEvent.setup();
    defaultRender();

    const amountOfFields = screen.getAllByRole('mainLabel').length;
    const btn = screen.getByTestId('submitBtn');
    await user.click(btn);

    expect(screen.queryAllByText(/is required/i)).to.have.length(
      amountOfFields
    );
  });

  it('trigger single validation field', async () => {
    const user = userEvent.setup();
    defaultRender();

    const amountOfFields = screen.getAllByRole('mainLabel').length;
    const btn = screen.getByTestId('submitBtn');
    await user.click(btn);

    expect(screen.queryAllByText(/is required/i)).to.have.length(
      amountOfFields
    );
  });

  // it('validation on empty email', async () => {
  //   const user = userEvent.setup();
  //   defaultRender();

  //   const inputEmail = screen.getByPlaceholderText(/email/i);
  //   await user.type(inputEmail, 'mail@mail.ru');

  //   const btn = screen.getByText('Login');
  //   await user.click(btn);

  //   expect(
  //     screen.getByText(/Incorrect email or password/i)
  //   ).toBeInTheDocument();
  // });

  // it('validation on empty password', async () => {
  //   const user = userEvent.setup();
  //   defaultRender();

  //   const inputPassword = screen.getByPlaceholderText(/password/i);
  //   await user.type(inputPassword, '1111');

  //   const btn = screen.getByText('Login');
  //   await user.click(btn);

  //   expect(
  //     screen.getByText(/Incorrect email or password/i)
  //   ).toBeInTheDocument();
  // });

  // it('no error on correct login and password', async () => {
  //   const user = userEvent.setup();
  //   defaultRender();

  //   const inputPassword = screen.getByPlaceholderText(/password/i);
  //   await user.type(inputPassword, '1111');
  //   const inputEmail = screen.getByPlaceholderText(/email/i);
  //   await user.type(inputEmail, 'mail@mail.ru');

  //   const btn = screen.getByText('Login');
  //   await user.click(btn);

  //   expect(
  //     screen.queryByText(/Incorrect email or password/i)
  //   ).not.toBeInTheDocument();
  // });

  // it('show success msg with correct userName', async () => {
  //   const user = userEvent.setup();
  //   defaultRender();

  //   const inputPassword = screen.getByPlaceholderText(/password/i);
  //   await user.type(inputPassword, '1111');
  //   const inputEmail = screen.getByPlaceholderText(/email/i);
  //   await user.type(inputEmail, 'mail@mail.ru');

  //   const btn = screen.getByText('Login');
  //   await user.click(btn);

  //   expect(screen.getByText(/Welocome/i)).toBeInTheDocument();
  //   expect(screen.getByText(providerUser.firstName)).toBeInTheDocument();
  // });

  // it('sign up links direct to sign up page', async () => {
  //   const user = userEvent.setup();
  //   defaultRender();

  //   const link = screen.getByText(/Sign up/i);
  //   await user.click(link);

  //   expect(window.location.pathname).toEqual('/signup');
  // });
});

// describe('SignUp update', () => {
//   defaultRender();

//   it('render Login component with correct word "Update"', () => {
//     expect(screen.getByText(/update account/i)).toBeInTheDocument();
//   });
// });
