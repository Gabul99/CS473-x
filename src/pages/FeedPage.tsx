import React, {useState} from 'react';
import styled from "styled-components";
import FeedInput from "../component/FeedInput";
import FeedItem from "../component/FeedItem";
import Colors from "../style/Colors";

const Container = styled.div`
  width: 640px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
  font-family: "bold", serif;
  flex-shrink: 0;
`;

const FeedList = styled.div`
  width: 100%;
  flex-grow: 1;
  min-height: 0;
  overflow-y: auto;
`;

const ToolBar = styled.div<{refreshing: boolean}>`
  width: 100%;
  height: 40px;
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  
  .refresh {
    font-size: 14px;
    font-family: "bold", serif;
    color: ${props => props.refreshing ? Colors.BLUE_LIGHT : Colors.BLUE_DEEP};
    cursor: pointer;
    margin-left: auto;
  }
`;

const FeedPage = () => {
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  return (
    <Container>
      <Title>Feed</Title>
      <FeedInput />
      <ToolBar refreshing={isRefreshing}>
        <div className={'refresh'}>REFRESH</div>
      </ToolBar>
      <FeedList>
        <FeedItem />
      </FeedList>
    </Container>
  );
};

export default FeedPage;
