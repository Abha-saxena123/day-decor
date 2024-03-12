import styled from "styled-components";
import { Typography } from "../../typography/typography";

export const HeaderContainer = styled.div`
  border-bottom: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  background-color: darkcyan;
`;

export const HeaderLogoContainer = styled.div`
  margin: 0 30px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  > span {
    margin-right: 20px !important;
  }
  > h4 {
    font-weight: 600;
    font-style: italic;
    font-family: emoji;
  }
`;

export const HeaderLinkContainer = styled.div`
  display: flex;
  margin-left: 50px;
  margin-right: 50px;
  justify-content: space-between;

  .h4 {
    margin-left: 50px;
    margin-right: 50px;
  }
`;

export const HeaderLinkText = styled(Typography)`
  margin-left: 50px !important;
  margin-right: 50px;

  a:-webkit-any-link {
    color: black;
    text-decoration: none;
  }
`;
