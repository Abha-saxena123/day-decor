import React, { FC } from "react";
import { getFontStyles } from "../../utils/helpers/typography.helpers";
import { StyledTypography } from "./typography.styles";
import { FontType } from "../../utils/constants/typography.constants";

interface TypographyProps {
  fontType: FontType;
  className?: string;
  color?: string;
}

export const Typography: FC<TypographyProps> = ({
  fontType,
  children,
  className,
  color,
}) => {
  const { desktop, mobile } = getFontStyles(fontType);

  return (
    <StyledTypography
      desktop={desktop}
      mobile={mobile}
      className={className}
      color={color}
    >
      {children}
    </StyledTypography>
  );
};
