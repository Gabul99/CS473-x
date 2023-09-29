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
    axios.get<Feed[]>(`https://cs473-test-b04585b2b629.herokuapp.com/feed?nickname=${user?.nickname ?? ''}`)
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

  return (
    <Container>
      <Title>Feed</Title>
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
