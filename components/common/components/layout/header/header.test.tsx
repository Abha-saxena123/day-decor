import { render, fireEvent, screen, waitFor, within } from 'common/utils/testing/test-utils';
import { Header } from './header';
import i18next from 'i18next';
import { I18N_DEFAULT_LANGUAGE, I18N_DEFAULT_NAMESPACE, i18nNextInit } from 'common/utils/helpers/i18next';
import defaultTranslations from 'public/locales/default/translation.json';
import userEvent from '@testing-library/user-event';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      pathname: '/',
    };
  },
}));

describe('Header', () => {
  it('should render all links', () => {
    setupHeader();

    const linksArray = ['Dashboard', 'Policies', 'Quotes', 'Claims', 'Documents', 'Billing'];

    linksArray.forEach((link: string) => {
      expect(screen.getByText(link)).toBeInTheDocument();
    });
  });

  it('should render language buttons', async () => {
    const { openLanguageDropdown, languageLinks } = setupHeader();

    openLanguageDropdown();

    await waitFor(() => {
      const dropdownOptionsContainer = screen.getAllByRole('listbox');

      dropdownOptionsContainer.forEach((dropdownOption: HTMLElement, index) => {
        within(dropdownOption).getByText(languageLinks[index]);
      });
    });
  });

  // skipping this test case as the languages options have been disabled
  // TODO: fix this when language selection is enabled
  it.skip('should change language', async () => {
    setupLocalization();
    setupHeader();

    // openLanguageDropdown();
    const dropdownOptionsContainer = screen.getByTestId('list');

    fireEvent.click(within(dropdownOptionsContainer).getByText(/english/i));
    await waitFor(() => {
      expect(i18next.language).not.toBe(I18N_DEFAULT_LANGUAGE);
      expect(screen.getByText(/english/i)).toBeInTheDocument();
    });
  });
});

const setupHeader = () => {
  const languageLinks = ['English', 'Danish', 'Spanish'];
  const wrapper = render(<Header />);

  const openLanguageDropdown = () => {
    userEvent.click(screen.getByText(/english/i));
  };

  return {
    ...wrapper,
    languageLinks,
    openLanguageDropdown,
  };
};

const setupLocalization = () => {
  i18nNextInit();
  i18next.changeLanguage(I18N_DEFAULT_LANGUAGE);
  i18next.addResourceBundle(I18N_DEFAULT_LANGUAGE, I18N_DEFAULT_NAMESPACE, defaultTranslations);
};
