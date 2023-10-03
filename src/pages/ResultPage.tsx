import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Feed, ResultFeed} from "../data/Feed";
import styled from "styled-components";
import Colors from "../style/Colors";
import ResultFeedItem from "../component/ResultFeedItem";

const Container = styled.div`
  width: 480px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Selector = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  height: 72px;
  
  .button {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background-color: ${Colors.BLACK12};
    }
    
    &.selected {
      background-color: ${Colors.BLACK12};
    }
  }
`;

const ScrollArea = styled.div`
  width: 100%;
  flex-grow: 1;
  min-height: 0;
`;

interface DTO {
  feedListForTopicA: ResultFeed[];
  feedListForTopicB: ResultFeed[];
}

const ResultPage = () => {
  const [selectedA, setSelectedA] = useState<boolean>(true);

  const [feedForA, setFeedForA] = useState<ResultFeed[]>([]);
  const [feedForB, setFeedForB] = useState<ResultFeed[]>([]);

  useEffect(() => {
    loadFeeds();
  }, []);

  const loadFeeds = () => {
    axios.get<DTO>(`https://cs473-test-b04585b2b629.herokuapp.com/feed/result`)
      .then(res => {
        setFeedForA(res.data.feedListForTopicA);
        setFeedForB(res.data.feedListForTopicB);
      })
      .catch(e => {
        console.log(e);
      })
  }

  return (
    <Container>
      <h1>Results</h1>
      <Selector>
        <div className={'button' + (selectedA ? ' selected' : '')} onClick={() => setSelectedA(true)}>Topic A</div>
        <div className={'button' + (selectedA ? '' : ' selected')} onClick={() => setSelectedA(false)}>Topic B</div>
      </Selector>
      <ScrollArea>
      {selectedA && feedForA.map(feed => <ResultFeedItem feed={feed}/>)}
      {!selectedA && feedForB.map(feed => <ResultFeedItem feed={feed} />)}
      </ScrollArea>
    </Container>
  );
};

export default ResultPage;
