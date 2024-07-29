import React from 'react';
import { Carousel } from 'antd';
import styled, { keyframes } from 'styled-components';

// Placeholder component for the skeleton loader
export const BannerSkeletonLoader = () => {
    return (
        <SkeletonSlide />
    );
};

// Styled component for the skeleton slide
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const SkeletonSlide = styled.div`
  background: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  height: 260px; /* Adjust height as needed */
  width: 100%;
  border-radius: 10px;
`;