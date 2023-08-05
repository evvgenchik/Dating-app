import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { providerUser, queryClientRender } from '@/utils/test';
import { vi } from 'vitest';
import SignUp, { ERRORS_SPECIFIC } from './SignUp';
import { format } from 'date-fns';
import { UserType } from '@/utils/types';

const defaultRender = (currentUser?: UserType) =>
  queryClientRender(<SignUp currentUser={currentUser} />);

describe('SignUp create', () => {
  it('render SignUp page with correct word "Create"', () => {
    defaultRender();
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

  it('not trigger validation on filled field', async () => {
    const user = userEvent.setup();
    defaultRender();

    const inputPassword = screen.getByPlaceholderText(/password/i);
    await user.type(inputPassword, '1111');

    expect(screen.queryByText(/password is required/i)).not.toBeInTheDocument();
  });

  it('trigger validation input onBlur', async () => {
    const user = userEvent.setup();
    defaultRender();

    const inputPassword = screen.getByPlaceholderText(/password/i);
    const inputName = screen.getByPlaceholderText(/first name/i);
    await user.click(inputName);
    await user.type(inputPassword, '1111');

    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
  });

  it('trigger validation input onBlur', async () => {
    const user = userEvent.setup();
    defaultRender();

    const inputPassword = screen.getByPlaceholderText(/password/i);
    const inputName = screen.getByPlaceholderText(/first name/i);
    await user.click(inputName);
    await user.type(inputPassword, '1111');

    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
  });

  it('trigger validation fields with correct error messages', async () => {
    window.URL.createObjectURL = vi.fn();
    const user = userEvent.setup();
    defaultRender();

    const testImageFile = new File(['hello'], 'hello.csv', {
      type: 'text/csv',
    });

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const inputFirstName = screen.getByPlaceholderText(/first name/i);
    const inputDescription = screen.getByPlaceholderText(/answer here/i);
    const inputFile = screen.getByLabelText('inputFile');
    const inputDate = screen.getByLabelText('inputDate');
    await user.type(inputEmail, 'a');
    await user.type(inputPassword, 'a');
    await user.type(inputFirstName, 'a');
    await user.type(inputDescription, 'a');
    await user.type(inputDate, '1020-05-12');
    await user.upload(inputFile, testImageFile);

    expect(
      screen.getByText(ERRORS_SPECIFIC.email.notMatch)
    ).toBeInTheDocument();
    expect(
      screen.getByText(ERRORS_SPECIFIC.password.length)
    ).toBeInTheDocument();
    expect(
      screen.getByText(ERRORS_SPECIFIC.firstName.capitalLetter)
    ).toBeInTheDocument();
    expect(
      screen.getByText(ERRORS_SPECIFIC.description.lengthMin)
    ).toBeInTheDocument();
    expect(screen.getByText(/valid date/i)).toBeInTheDocument();
    expect(screen.getByText(/valid image/i)).toBeInTheDocument();
  });

  it('no errors on correct input', async () => {
    window.URL.createObjectURL = vi.fn();
    const user = userEvent.setup();
    defaultRender();

    const testImageFile = new File(['hello'], 'hello.png', {
      type: 'image/png',
    });

    const inputEmail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/password/i);
    const inputFirstName = screen.getByPlaceholderText(/first name/i);
    const inputDescription = screen.getByPlaceholderText(/answer here/i);
    const inputFile = screen.getByLabelText('inputFile');
    const inputDate = screen.getByLabelText('inputDate');
    await user.type(inputEmail, 'mail@mail.ru');
    await user.type(inputPassword, 'Ivan');
    await user.type(inputFirstName, 'Ivan');
    await user.type(inputDescription, 'Smart and bright like a sun');
    await user.type(inputDate, '1990-05-12');
    await user.upload(inputFile, testImageFile);

    expect(screen.queryAllByRole('errorMsg')).to.have.length(0);
  });
});

describe('SignUp update', () => {
  it('render SignUp page with correct word "Update"', () => {
    defaultRender(providerUser);
    expect(screen.getByText(/update account/i)).toBeInTheDocument();
  });

  it('render SignUp update page with correct user data', () => {
    defaultRender(providerUser);

    expect(
      screen.getByDisplayValue(providerUser.firstName)
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(providerUser.email)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(
        format(new Date(providerUser.birthday), 'yyyy-MM-dd')
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole('radio', { name: 'looking-' + providerUser.looking })
    ).toBeChecked();
    expect(
      screen.getByRole('radio', { name: 'gender-' + providerUser.gender })
    ).toBeChecked();
    expect(
      screen.getByDisplayValue(providerUser.descriptrion)
    ).toBeInTheDocument();
    expect(screen.getByAltText('profile')).toBeInTheDocument();
  });
});
