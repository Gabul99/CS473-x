import React from 'react';
import styled from "styled-components";
import FeedInput from "../component/FeedInput";

const Container = styled.div`
  width: 640px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-family: "bold", serif;
`;

const FeedPage = () => {
  return (
    <Container>
      <Title>Feed</Title>
      <FeedInput />
    </Container>
  );
};

export default FeedPage;
