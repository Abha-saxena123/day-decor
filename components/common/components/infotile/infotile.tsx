import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

interface InfoTileProps {
  label: ReactNode;
  children: ReactNode;
  fontSizeLabel?: number;
  fontSizeChildren?: number;
}

export const InfoTile: React.FC<InfoTileProps> = ({
  children,
  label,
  fontSizeLabel,
  fontSizeChildren,
}) => {
  return (
    <>
      <Title fontSize={fontSizeLabel || 28}>{label}</Title>
      <Value fontSize={fontSizeChildren || 20}>{children}</Value>
    </>
  );
};

const Title = styled.div<{ fontSize: number }>`
  font-size: ${({ fontSize }) => `${fontSize}px`};
  font-weight: 600;
  color: brown;
  margin-top: 16px;
  margin-bottom: 4px;
`;

const Value = styled.div<{ fontSize: number }>`
  font-size: ${({ fontSize }) => `${fontSize}px`};
`;
