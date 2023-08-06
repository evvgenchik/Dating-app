import { screen } from '@testing-library/react';
import Footer from './Footer';
import { customRender } from '@/utils/test';

const matchMediaValue =
  (matches = false) =>
  () => ({
    matches,
    addEventListener: () => {},
    removeEventListener: () => {},
  });

Object.defineProperty(window, 'matchMedia', {
  value: matchMediaValue(),
});

describe('Footer', () => {
  it('render Footer component', () => {
    customRender(<Footer />);

    expect(screen.getByText(/© Finder/i)).toBeInTheDocument();
  });

  it('show menu on smaller screen', () => {
    Object.defineProperty(window, 'matchMedia', {
      value: matchMediaValue(true),
    });

    customRender(<Footer />);

    expect(screen.getByText(/Home/i)).toBeInTheDocument();
  });
});
