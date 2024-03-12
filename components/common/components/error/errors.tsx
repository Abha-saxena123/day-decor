import React from "react";
import styled from "styled-components";

export default function Error({
  errorMessage,
}: {
  errorMessage?: string;
}): JSX.Element {
  return (
    <ErrorContainer>
      <p>{errorMessage || "Something went wrong"}</p>
    </ErrorContainer>
  );
}

const ErrorContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
`;
