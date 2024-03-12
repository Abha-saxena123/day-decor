import React from "react";
import Image from "next/image";
import { FooterContainer, FooterContainerItem } from "./footer.styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import YouTubeIcon from "@material-ui/icons/YouTube";
import FacebookIcon from "@material-ui/icons/Facebook";

export const FooterSocialMediaIcons = [
  {
    Src: LinkedInIcon,
    name: "LinkedinIcon",
  },
  {
    Src: TwitterIcon,
    name: "TwitterIcon",
  },
  {
    Src: InstagramIcon,
    name: "InstagramIcon",
  },
  {
    Src: YouTubeIcon,
    name: "YoutubeIcon",
  },
  {
    Src: FacebookIcon,
    name: "FacebookIcon",
  },
];

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      {FooterSocialMediaIcons.map(({ Src, name }, index) => (
        <FooterContainerItem key={index}>
          <Src/>
        </FooterContainerItem>
      ))}
    </FooterContainer>
  );
};
