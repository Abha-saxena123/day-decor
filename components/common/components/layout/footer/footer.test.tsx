import { render, screen } from 'common/utils/testing/test-utils';
import { Footer } from './footer';

describe('Footer', () => {
  it('should render all 5 social media icons', () => {
    render(<Footer />);

    expect(screen.getByRole('img', { name: 'LinkedinIcon' })).toBeInTheDocument();

    expect(screen.getByRole('img', { name: 'TwitterIcon' })).toBeInTheDocument();

    expect(screen.getByRole('img', { name: 'InstagramIcon' })).toBeInTheDocument();

    expect(screen.getByRole('img', { name: 'YoutubeIcon' })).toBeInTheDocument();

    expect(screen.getByRole('img', { name: 'FacebookIcon' })).toBeInTheDocument();

    expect(screen.getAllByRole('img').length).toEqual(5);
  });
});
