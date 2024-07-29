import React from "react";
import Image from "next/image";
import { FooterContainer, FooterContainerItem } from "./footer.styles";
import { LinkedinOutlined } from '@ant-design/icons';

export const FooterSocialMediaIcons = [
  {
    Src: LinkedinOutlined,
    name: "LinkedinIcon",
  },
  // {
  //   Src: TwitterIcon,
  //   name: "TwitterIcon",
  // },
  // {
  //   Src: InstagramIcon,
  //   name: "InstagramIcon",
  // },
  // {
  //   Src: YouTubeIcon,
  //   name: "YoutubeIcon",
  // },
  // {
  //   Src: FacebookIcon,
  //   name: "FacebookIcon",
  // },
];

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      {FooterSocialMediaIcons.map(({ Src, name }, index) => (
        <FooterContainerItem key={index}>
          <Src />
        </FooterContainerItem>
      ))}
    </FooterContainer>
  );
};
