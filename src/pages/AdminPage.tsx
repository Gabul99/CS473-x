import React, {useState} from 'react';
import styled from "styled-components";
import Colors from "../style/Colors";
import axios from "axios";
import {Feed} from "../data/Feed";
import {useRecoilValue} from "recoil";
import {userAtom} from "../store/UserAtom";
import AdminFeedItem from "../component/AdminFeedItem";

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
  margin-bottom: 8px;
  box-sizing: border-box;
  flex-shrink: 0;
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

const FeedList = styled.div`
  width: 100%;
  flex-grow: 1;
  min-height: 0;
  overflow-y: auto;
`;

const AdminPage = () => {
  const user = useRecoilValue(userAtom);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);
  const [feeds, setFeeds] = useState<Feed[]>([]);

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

  return (
    <Container>
      <Title>Admin</Title>
      <Instruction>
        Discuss with your team members and decide which comments to delete by what criteria!<br/>(ex. fake news, hate
        speech, etc)
      </Instruction>
      <ToolBar refreshing={isRefreshing}>
        <div className={'refresh'} onClick={loadFeeds}>REFRESH</div>
      </ToolBar>
      <FeedList>
        {feeds.map(feed => <AdminFeedItem feed={feed} refresh={loadFeeds}/>)}
      </FeedList>
    </Container>
  );
};

export default AdminPage;
