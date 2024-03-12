import { StyledTypographyProps } from "../../types/typography.types";
import styled from "styled-components";

export const StyledTypography = styled.div<StyledTypographyProps>`
  display: flex;
  color: ${({ color }) => (color ? color : "black")};
  font-size: ${(style) => style.desktop.fontSize};
  font-weight: ${(style) => style.desktop.fontWeight};
  line-height: ${(style) => style.desktop.lineHeight};
  letter-spacing: ${(style) => style.desktop.letterSpacing};
`;
// ${MediaBreakpoints.down('md')} {
//   font-size: ${(style) => style.mobile?.fontSize};
//   line-height: ${(style) => style.mobile?.lineHeight};
// }
