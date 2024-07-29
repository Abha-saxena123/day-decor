import { Typography } from "antd";
import { FC } from "react";
import styled from 'styled-components';
import { StarFilled } from '@ant-design/icons'

// Styled components
const Container = styled.div`
  display: flex;
gap:16px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SearchTile: FC<{ title: string; image: string; rating: number }> = ({ title, image, rating }) => {
    return <Container>
        <Image src={image} alt={title} />
        <InfoContainer>
            <Typography.Text >{title}</Typography.Text>
            <Typography.Text >{rating} <StarFilled style={{ color: "#FFD700" }} /></Typography.Text>
        </InfoContainer>
    </Container>
}