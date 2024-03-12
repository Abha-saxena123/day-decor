import { FontType } from '../utils/constants/typography.constants';

export interface StyledTypographyProps {
  desktop: {
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
    letterSpacing?: string;
  };
  mobile?: {
    fontSize: string;
    fontWeight?: string;
    lineHeight: string;
  };
  color?: string;
}

export type TypographyFontType = Record<FontType, StyledTypographyProps>;
