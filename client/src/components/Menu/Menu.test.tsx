import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from './Menu';
import { BrowserRouter } from 'react-router-dom';
describe('Menu', () => {
  it('render Menu component', () => {
    render(<Menu />, { wrapper: BrowserRouter });

    expect(screen.getByText(/match/i)).toBeInTheDocument();
  });

  it('navigate links menu works', async () => {
    render(<Menu />, { wrapper: BrowserRouter });

    await userEvent.click(screen.getByText(/about/i));
    expect(window.location.pathname).toEqual('/about');
  });
});
