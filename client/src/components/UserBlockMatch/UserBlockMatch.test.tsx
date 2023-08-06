import { screen } from '@testing-library/react';
import UserBlockMatch from './UserBlockMatch';
import { customRender } from '@/utils/test';

describe('UserBlockMatch', () => {
  it('render UserBlockMatch component', () => {
    customRender(<UserBlockMatch isShow={true} />);

    expect(screen.getByText(/Matches/i)).toBeInTheDocument();
  });
});
