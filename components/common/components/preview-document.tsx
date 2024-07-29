// src/PrivacyPolicy.js
import React from 'react';
import styled from 'styled-components';

const PrivacyPolicyWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const IframeWrapper = styled.iframe`
  width: 80%; /* Adjust width as needed */
  height: 100%; /* Full height of the parent div */
 min-height: 100vh;
min-width:60vw;
  border: none; /* Remove default border */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); /* Optional: Add a subtle shadow */
`;

export const DocumentPreview = ({ file }: { file: string }) => {
    return (
        <PrivacyPolicyWrapper>
            <IframeWrapper src={file} />
        </PrivacyPolicyWrapper>
    );
};
