import { StyledTypographyProps } from "../../types/typography.types";
import {
  FontType,
  TypographyFontStyles,
} from "../constants/typography.constants";

export const getFontStyles = (fontType: FontType): StyledTypographyProps => {
  switch (fontType) {
    case FontType.HERO:
      return TypographyFontStyles[FontType.HERO];

    case FontType.FACTS:
      return TypographyFontStyles[FontType.FACTS];

    case FontType.HEADLINE1:
      return TypographyFontStyles[FontType.HEADLINE1];

    case FontType.HEADLINE2:
      return TypographyFontStyles[FontType.HEADLINE2];

    case FontType.HEADLINE3:
      return TypographyFontStyles[FontType.HEADLINE3];

    case FontType.HEADLINE4:
      return TypographyFontStyles[FontType.HEADLINE4];

    case FontType.COPY_LARGE:
      return TypographyFontStyles[FontType.COPY_LARGE];

    case FontType.COPY_LARGE_BOLD:
      return TypographyFontStyles[FontType.COPY_LARGE_BOLD];

    case FontType.COPY_SMALL:
      return TypographyFontStyles[FontType.COPY_SMALL];

    case FontType.COPY_SMALL_MEDIUM:
      return TypographyFontStyles[FontType.COPY_SMALL_MEDIUM];

    case FontType.COPY_SMALL_BOLD:
      return TypographyFontStyles[FontType.COPY_SMALL_BOLD];

    case FontType.TOP_LINE_LARGE:
      return TypographyFontStyles[FontType.TOP_LINE_LARGE];

    case FontType.TOP_LINE_SMALL:
      return TypographyFontStyles[FontType.TOP_LINE_SMALL];

    case FontType.COPY_EXTRA_SMALL:
      return TypographyFontStyles[FontType.COPY_EXTRA_SMALL];
  }
};
