import React from "react";
import {
  HeaderContainer,
} from "./header.styles";

import styled from "styled-components";
import { Typography } from "../../typography/typography";

export const Header: React.FC = () => {

  return (
    <HeaderContainer>
      {/* <HeaderLinkContainer>
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
      </LogoutButton> */}
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
