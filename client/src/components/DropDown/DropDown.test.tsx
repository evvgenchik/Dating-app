import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DropDown from './DropDown';
import { customRender, providerUser } from '@/utils/test';
import { vi } from 'vitest';

vi.mock('@/api/axios');

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

    await user.click(screen.getByText(/logout/i));
    expect(window.location.pathname).toEqual('/');
  });

  it('go to profile page after on click', async () => {
    customRender(<DropDown />, providerUser);

    await userEvent.click(screen.getByText(/My Profile/i));
    expect(window.location.pathname).toEqual('/profile');
  });

  it('dropDonw visible after click', async () => {
    const user = userEvent.setup();
    customRender(<DropDown />, providerUser);

    const dropDownComponent = screen.getByRole('drowDown');
    const style = window.getComputedStyle(dropDownComponent);

    await user.click(screen.getByRole('img'));
    expect(style.visibility).toBe('visible');
  });
});
