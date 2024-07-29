import React, { useState } from 'react';
import styled from 'styled-components';
import { Drawer, Button } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ShoppingCartOutlined, HeartFilled, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { SearchComponent } from "./search"

const NavbarContainer = styled.nav`
  background-color: black;
  height: 50px;
  display:flex;
  height:60px;
  justify-content:space-between;
  align-items:center;
  width: 100%;
  min-width: max-content;
`;

const NavbarList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap:16px;
  justify-content: space-between;
@media (max-width: 768px) {
    display: none;
  }
`;

const NavbarItem = styled.li`
  margin-right: 10px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavbarLink = styled.a`
  text-decoration: none;
  color: #fff;
  border-radius:50%;
  padding: 6px;
  border: 2px solid #fff;
  &:hover {
    color: #ccc;
  }
`;



export const Navbar = () => {
  const router = useRouter();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const onClick = () => {
    router.push('/');
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };
  return (
    <NavbarContainer>
      <Logo onClick={onClick}>
        <Image
          width={90}
          height={90}
          src="/logo.png"
          alt="logo"
          placeholder="blur"
          priority={false}
          blurDataURL="/logo.png"
        />
      </Logo>
      <NavbarItem >
        <SearchComponent />
      </NavbarItem>
      <NavbarList>
        {navItems.map(({ href, text, icon: Icons }) => {
          const icon = Icons ? <Icons /> : null;
          return <NavbarItem key={text}>
            <NavbarLink href={href}>{icon}</NavbarLink>
          </NavbarItem>
        }
        )}
      </NavbarList>
      <HamburgerButton icon={<MenuOutlined />} onClick={showDrawer} />
      <Drawer
        title="Menu"
        placement="left"
        onClose={closeDrawer}
        visible={drawerVisible}
      >
        <DrawerContent>
          <SearchComponent />
          <MenuList>
            {navItems.map(({ href, text, icon: Icons }) => {
              const icon = Icons ? <Icons /> : null;
              return (
                <MenuItem key={text}>
                  <MenuLink href={href} onClick={closeDrawer}>
                    {icon}  {text}
                  </MenuLink>
                </MenuItem>
              );
            })}
          </MenuList>
        </DrawerContent>
      </Drawer>
    </NavbarContainer>
  );
};

const navItems = [
  { href: '/wishlist', text: 'Wish List', icon: HeartFilled },
  { href: '/cart', text: 'Your Cart', icon: ShoppingCartOutlined },
  { href: '/profile', text: 'User Profile', icon: UserOutlined },
];


const Logo = styled.div`
height:100px;
width:100px;
justify-content:center;
display:flex;
align-content:center;
margin-left:24px;
background-color:black;
border-radius:50%;
margin-top:24px;
 cursor: pointer;
>img{
margin-top:16px;
}
`

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 10px;
`;

const MenuLink = styled.a`
  text-decoration: none;
  color: black;
  font-size: 18px;

  &:hover {
    color: #1890ff;
  }
`;

const HamburgerButton = styled(Button)`
  display: none !important;

  @media (max-width: 768px) {
    display: inline-flex !important;
    background: none;
    border: none;
    color: #fff;
    font-size: 24px;
  }
`;