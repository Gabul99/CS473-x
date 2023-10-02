import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import FeedInput from "../component/FeedInput";
import FeedItem from "../component/FeedItem";
import Colors from "../style/Colors";
import {Feed} from "../data/Feed";
import {useRecoilValue} from "recoil";
import {userAtom} from "../store/UserAtom";
import axios from "axios";
import UserType from "../data/UserEnum";

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

const Instruction = styled.div`
  width: 100%;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  background-color: ${Colors.BLUE_LIGHT};
  font-size: 14px;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-sizing: border-box;
  flex-shrink: 0;;
`;

const FeedList = styled.div`
  width: 100%;
  flex-grow: 1;
  min-height: 0;
  overflow-y: auto;
`;

const ToolBar = styled.div<{ refreshing: boolean }>`
  width: 100%;
  height: 40px;
  padding: 0 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  flex-shrink: 0;

  .refresh {
    font-size: 14px;
    font-family: "bold", serif;
    color: ${props => props.refreshing ? Colors.BLUE_LIGHT : Colors.BLUE_DEEP};
    cursor: pointer;
    margin-left: auto;
  }
`;

const FeedPage = () => {
  const user = useRecoilValue(userAtom);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [feeds, setFeeds] = useState<Feed[]>([]);

  useEffect(() => {
    loadFeeds();
  }, []);

  const loadFeeds = () => {
    setRefreshing(true);
    axios.get<Feed[]>(`https://cs473-test-b04585b2b629.herokuapp.com/feed?type=${user?.type ?? 'A'}&nickname=${user?.nickname ?? ''}`)
    // axios.get<Feed[]>(`http://localhost:8080/feed?nickname=${user?.nickname ?? ''}`)
      .then(res => {
        setFeeds(res.data);
        setTimeout(() => {
          setRefreshing(false);
        }, 3000);
      })
      .catch(e => {
        console.log(e);
        setRefreshing(false);
      })
  }

  const uploadFeed = (content: string, isFake: boolean, completion: () => void) => {
    axios.post(`https://cs473-test-b04585b2b629.herokuapp.com/feed`, {
    // axios.post(`http://localhost:8080/feed`, {
      type: user?.type ?? 'A',
      nickname: user?.nickname ?? '',
      content,
      isFake,
    })
      .then(() => {
        completion();
        loadFeeds();
      })
      .catch(() => {
        console.log('Fail to upload');
      })
  }

  function getInstruction(): string {
    switch (user?.userType) {
      case UserType.AUDIENCE:
        return "Read feeds and Click the 'like' to posts which you agree or feel fun! You should build your opinion based on feeds and response in google form"
      case UserType.AGREE:
      case UserType.DISAGREE:
        return "Write real news or fake news to persuade audience with your opinion! 1) When writing fake news, try to create fake news that seems real so it doesn't get deleted by Admin! 2) Try to counter your opponent's fake news!";
      default:
        return '';
    }
  }

  return (
    <Container>
      <Title>Feed</Title>
      <Instruction>{getInstruction()}</Instruction>
      {user?.userType !== UserType.AUDIENCE &&
      <FeedInput onSubmit={uploadFeed}/>
      }
      <ToolBar refreshing={isRefreshing}>
        <div className={'refresh'} onClick={loadFeeds}>REFRESH</div>
      </ToolBar>
      <FeedList>
        {feeds.map(feed => <FeedItem feed={feed}/>)}
      </FeedList>
    </Container>
  );
};

export default FeedPage;
