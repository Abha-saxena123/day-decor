import styled, { keyframes } from "styled-components";

// Skeleton loader for OvalCard
export const OvalCardSkeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonOvalCardWrapper>
        <SkeletonImage />
        <SkeletonShapes>
          <div className="shape" />
          <div className="shape" />
        </SkeletonShapes>
      </SkeletonOvalCardWrapper>
      <SkeletonText />
    </SkeletonWrapper>
  );
};

const pulse = keyframes`
    0% { opacity: 0.6; }
    50% { opacity: 1; }
    100% { opacity: 0.6; }
`;

const SkeletonWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const SkeletonOvalCardWrapper = styled.div`
    position: relative;
    width: 200px; /* Adjust width as needed */
    height: 320px; /* Adjust height as needed */
    margin-bottom: 16px; /* Adjust margin as needed */
    border-radius: 50%;
    overflow: hidden;
`;

const SkeletonImage = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ccc; /* Placeholder color */
    animation: ${pulse} 1.5s infinite; /* Animation effect */
`;

const SkeletonShapes = styled.div`
    display: flex;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: space-between;
`;

const SkeletonText = styled.div`
    width: 120px; /* Adjust width as needed */
    height: 20px; /* Adjust height as needed */
    background-color: #ccc; /* Placeholder color */
    animation: ${pulse} 1.5s infinite; /* Animation effect */
    margin-bottom: 8px; /* Adjust margin as needed */
`;