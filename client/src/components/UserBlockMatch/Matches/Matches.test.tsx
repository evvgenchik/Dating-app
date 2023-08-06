import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Matches from './Matches';
import { customRender, matchingUser, providerUser } from '@/utils/test';

describe('Matches', () => {
  it('render empty block if no matching users', () => {
    customRender(<Matches />, { ...providerUser, matching: [] });

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('don`t show matching user if match not mutual', () => {
    const userCopy = JSON.parse(JSON.stringify(providerUser));
    userCopy.matching[0].userAddressAnswer = false;
    customRender(<Matches />, userCopy);

    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('render Matches component with correct user info', () => {
    customRender(<Matches />);

    expect(screen.getByText(matchingUser.firstName)).toBeInTheDocument();
  });

  it('navigation to messages on click', async () => {
    const user = userEvent.setup();
    customRender(<Matches />);

    const matchingUserBlock = screen.getByText(matchingUser.firstName);
    await user.click(matchingUserBlock);

    expect(window.location.pathname).toEqual(`/app/message/${matchingUser.id}`);
  });
});
