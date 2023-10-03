import React from 'react';
import {Feed, ResultFeed} from "../data/Feed";
import styled from "styled-components";
import Colors from "../style/Colors";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${Colors.BLUE_LIGHT};
  padding: 16px 0;
  gap: 12px;
  .deleted {
    font-size: 12px;
    font-family: "bold", serif;
    color: ${Colors.RED_DEEP};
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  
  .author {
    font-size: 14px;
    font-family: "bold", serif;
  }
  
  .fake {
    font-size: 14px;
  }
`;

interface Props {
  feed: ResultFeed;
}

const ResultFeedItem = ({ feed }: Props) => {
  return (
    <Container>
      <Header>
        <div className={"author"}>{feed.author}</div>
        <div className={"fake"}>{feed.isFake ? "It's FAKE" : "It's TRUTH"}</div>
      </Header>
        {feed.isDeleted && <div className={'deleted'}>It was deleted by admin</div>}
      <div>{feed.content}</div>
    </Container>
  );
};

export default ResultFeedItem;
