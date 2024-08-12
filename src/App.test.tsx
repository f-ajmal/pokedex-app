import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  beforeEach(() => {
    render(<App />);
  });
  
  afterEach(cleanup);

  it('renders SearchContainer', () => {
    expect(screen.getByTestId('search-container')).toBeInTheDocument();
  });

  it('renders CapturedContainer', () => {
    expect(screen.getByTestId('captured-container')).toBeInTheDocument();
  });

  it('renders footer with correct links', () => {
    const footer = screen.getByTestId('footer');
    const footerLinks = footer.querySelectorAll('a');
    expect(footerLinks).toHaveLength(3);
    expect(footerLinks[0]).toHaveAttribute('href', 'https://github.com/f-ajmal/pokedex-app');
    expect(footerLinks[1]).toHaveAttribute('href', 'https://pokeapi.co/');
    expect(footerLinks[2]).toHaveAttribute('href', 'https://www.flaticon.com/free-icons/pokemon');
  });
});
