import { TypographyFontType } from '../../types/typography.types';

export enum FontType {
  HERO = 'hero',
  FACTS = 'facts',
  HEADLINE1 = 'headline-1',
  HEADLINE2 = 'headline-2',
  HEADLINE3 = 'headline-3',
  HEADLINE4 = 'headline-4',
  COPY_LARGE = 'copy-large',
  COPY_LARGE_BOLD = 'copy-large-bold',
  COPY_SMALL = 'copy-small',
  COPY_SMALL_MEDIUM = 'copy-small-medium',
  COPY_SMALL_BOLD = 'copy-small-bold',
  TOP_LINE_LARGE = 'top-line-large',
  TOP_LINE_SMALL = 'top-line-small',
  COPY_EXTRA_SMALL = 'copy-extra-small',
}

export const TypographyFontStyles: TypographyFontType = {
  hero: {
    desktop: { fontWeight: '600', fontSize: '56px', lineHeight: '64px', letterSpacing: '0.25px' },
    mobile: { fontSize: '24px', lineHeight: '28px' },
  },
  facts: {
    desktop: { fontWeight: '800', fontSize: '42px', lineHeight: '44px', letterSpacing: '0.3px' },
    mobile: { fontSize: '32px', lineHeight: '32px' },
  },
  'headline-1': {
    desktop: { fontWeight: '600', fontSize: '32px', lineHeight: '38px', letterSpacing: '0.25px' },
    mobile: { fontSize: '24px', lineHeight: '28px' },
  },
  'headline-2': {
    desktop: { fontWeight: '500', fontSize: '26px', lineHeight: '32px', letterSpacing: '0.25px' },
    mobile: { fontSize: '20px', lineHeight: '24px' },
  },

  'headline-3': {
    desktop: { fontWeight: '600', fontSize: '18px', lineHeight: '24px' },
    mobile: { fontSize: '14px', lineHeight: '16px' },
  },

  'headline-4': {
    desktop: { fontWeight: '500', fontSize: '18px', lineHeight: '24px' },
    mobile: { fontSize: '14px', lineHeight: '16px' },
  },

  'copy-large': {
    desktop: { fontWeight: '500', fontSize: '16px', lineHeight: '22px' },
    mobile: { fontSize: '14px', lineHeight: '18px' },
  },

  'copy-large-bold': {
    desktop: { fontWeight: '600', fontSize: '16px', lineHeight: '22px' },
    mobile: { fontSize: '14px', lineHeight: '18px' },
  },

  'copy-small': {
    desktop: { fontWeight: '400', fontSize: '14px', lineHeight: '20px' },
    mobile: { fontSize: '12px', lineHeight: '16px' },
  },

  'copy-small-medium': {
    desktop: { fontWeight: '500', fontSize: '14px', lineHeight: '20px' },
  },

  'copy-small-bold': {
    desktop: { fontWeight: '600', fontSize: '14px', lineHeight: '20px' },
    mobile: { fontSize: '12px', lineHeight: '24px' },
  },

  'top-line-large': {
    desktop: { fontWeight: '500', fontSize: '18px', lineHeight: '22px' },
    mobile: { fontSize: '16px', lineHeight: '20px' },
  },

  'top-line-small': {
    desktop: { fontWeight: '400', fontSize: '14px', lineHeight: '20px' },
    mobile: { fontSize: '12px', lineHeight: '16px' },
  },

  'copy-extra-small': {
    desktop: { fontWeight: '600', fontSize: '12px', lineHeight: '16px' },
  },
};
