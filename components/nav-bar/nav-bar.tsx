import React from 'react';
import styled from 'styled-components';
import { Menus } from './menu';

const NavbarContainer = styled.nav`
  background-color: black;
  height: 50px;
  display:flex;
  height:60px;
  justify-content:space-between;
  align-items:center;
`;

const NavbarList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
`;

const NavbarItem = styled.li`
  margin-right: 10px;
`;

const NavbarLink = styled.a`
  text-decoration: none;
  color: #fff;
  &:hover {
    color: #ccc;
  }
`;



export const Navbar = () => {
  return (
    <NavbarContainer>
      <Menus />
      <NavbarItem >
        Search
      </NavbarItem>
      <NavbarList>
        {navItems.map(({ href, text }) =>
          <NavbarItem key={text}>
            <NavbarLink href={href}>{text}</NavbarLink>
          </NavbarItem>
        )}
      </NavbarList>
    </NavbarContainer>
  );
};

const navItems = [
  { href: '#', text: 'Home' },
  { href: '#', text: 'About' },
  { href: '#', text: 'Services' },
];
