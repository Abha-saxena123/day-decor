import styled, { keyframes } from "styled-components";
import { Wrapper, TextWrapper, StyledDivider, Tags } from "../card/product-description-card";


export const ProductDescriptionSkeletonLoader = () => {
    return (
        <Wrapper>
            <WishListDivSkeleton />
            <ImageSkeleton />
            <TextWrapper>
                <StyledTextSkeleton />
                <StyledDivider>
                    <StyledSPSkeleton />
                    <StyledQuoteSkeleton />
                </StyledDivider>
                <StyledDivSkeleton />
                <Tags>
                    <StyledTagSkeleton />
                    <StyledTagSkeleton />
                    <StyledTagSkeleton />
                </Tags>
            </TextWrapper>
        </Wrapper>
    );
};

// Styled components for the skeleton loader
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const SkeletonElement = styled.div`
  background: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`;


const WishListDivSkeleton = styled(SkeletonElement)`
  z-index: 2;
  background-color: white;
  position: absolute;
  left: 175.5px;
  display: flex;
  border: 1px solid grey;
  border-bottom-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 2px;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;

const ImageSkeleton = styled(SkeletonElement)`
  position: relative;
  z-index: 1;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  max-width: 200px;
  height: 200px;
`;


const StyledTextSkeleton = styled(SkeletonElement)`
  color: grey;
  margin-top: 8px;
`;

const StyledSPSkeleton = styled(SkeletonElement)`
  color: black;
`;

const StyledDivSkeleton = styled(SkeletonElement)`
  display: flex;
  margin: 4px 0px;
  margin-top: 0;
`;



const StyledQuoteSkeleton = styled(SkeletonElement)`
  border: 1px solid green;
  padding: 4px;
  margin: 0;
  border-radius: 10px;
  color: green;
`;


const StyledTagSkeleton = styled(SkeletonElement)`
  border-radius: 4px;
  color: indigo;
  width: max-content;
  background-color: pink;
  font: solid;
  padding: 4px;
  font-size: 10px;
  font-weight: 600;
`;