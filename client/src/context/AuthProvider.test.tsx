import { screen } from '@testing-library/react';
import AuthContext, { AuthProvider } from './AuthProvider';
import { providerUser, queryClientRender } from '@/utils/test';

describe('AuthProvider', () => {
  test('AuthProvider shows default empty value', () => {
    queryClientRender(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => <span>User is: {value.user?.firstName}</span>}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    expect(screen.getByText(`User is:`)).toBeTruthy();
  });

  it('AuthProvider provide correct value', () => {
    localStorage.setItem('user', JSON.stringify(providerUser));

    queryClientRender(
      <AuthProvider>
        <AuthContext.Consumer>
          {(value) => <span>User is: {value.user.firstName}</span>}
        </AuthContext.Consumer>
      </AuthProvider>
    );

    expect(screen.getByText(`User is: ${providerUser.firstName}`)).toBeTruthy();
  });
});
