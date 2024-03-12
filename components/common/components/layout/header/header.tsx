import React from "react";
import {
  HeaderContainer,
  HeaderLinkContainer,
  HeaderLinkText,
} from "./header.styles";
import { useRouter } from "next/router";
import {
  FontType,
  TypographyFontStyles,
} from "../../../utils/constants/typography.constants";
import Link from "next/link";
import { Button } from "@material-ui/core";
import { handleLogout } from "../../../../auth/utils/helpers/auth.helpers";
import styled from "styled-components";
import { Typography } from "../../typography/typography";

export const Header: React.FC = () => {
  const links = ["/", "/add-dream"];
  const linkValue = ["List", "Add Dreams"];

  return (
    <HeaderContainer>
      <HeaderLinkContainer>
        {links.map((link, idx) => (
          <HeaderLinkText fontType={FontType.HEADLINE1} key={idx}>
            <Link href={link}>{linkValue[idx]}</Link>
          </HeaderLinkText>
        ))}
      </HeaderLinkContainer>
      <LogoutButton onClick={handleLogout}>
        <Typography fontType={FontType.HEADLINE2}>
          Logout <span>😧</span>
        </Typography>{" "}
      </LogoutButton>
    </HeaderContainer>
  );
};

const LogoutButton = styled.div`
  position: absolute;
  right: 50px;
  > div > span {
    display: none;
  }
  :hover {
    > div > span {
      display: block;
    }
  }
`;
