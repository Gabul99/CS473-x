import React, {useMemo, useState} from 'react';
import styled from "styled-components";
import {ReactComponent as EmptyHeart} from '../icon/heart-regular.svg'
import {ReactComponent as FillHeart} from '../icon/heart-solid.svg'
import Colors from "../style/Colors";
import {Feed} from "../data/Feed";
import axios from "axios";
import {useRecoilValue} from "recoil";
import {userAtom} from "../store/UserAtom";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  box-sizing: border-box;
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: 1px solid ${Colors.BLUE_LIGHT};
`;

const Author = styled.div`
  font-family: "bold", serif;
  font-size: 14px;
`;

const Content = styled.div`
  width: 100%;
  font-size: 14px;
  overflow: hidden;
  word-break: break-all;
`;

const DeleteText = styled.div`
  width: 100%;
  font-size: 14px;
  color: ${Colors.RED_DEEP};
`;

const ToolBar = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;

  .icon-button {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .count {
    font-size: 12px;
    color: ${Colors.BLUE_DEEP};
  }
`;

interface Props {
  feed: Feed;
}

const FeedItem = ({ feed }: Props) => {
  const user = useRecoilValue(userAtom);
  const [isLiked, setLiked] = useState<boolean>(feed.isLiked);

  const correctLikeCount = useMemo(() => {
    if (!isLiked && feed.isLiked) {
      return -1;
    }
    if (isLiked && !feed.isLiked) {
      return 1;
    }
    return 0;
  }, [isLiked, feed]);

  const sendLike = (value: boolean) => {
    setLiked(value)
    axios.post(`https://cs473-test-b04585b2b629.herokuapp.com/feed/like`, {
    // axios.post(`http://localhost:8080/feed/like`, {
      nickname: user?.nickname ?? '',
      feedId: feed.id
    })
      .then(() => {

      })
      .catch(() => {
        setLiked(!value);
      })
  }

  return (
    <Container>
      <Author>{feed.author}</Author>
      {feed.isDeleted && <DeleteText>This is deleted by admin</DeleteText>}
      {!feed.isDeleted && <Content>{feed.content}</Content>}
      <ToolBar>
        <div className={'icon-button'} onClick={() => sendLike(!isLiked)}>
          {isLiked &&
          <FillHeart fill={Colors.BLUE_MEDIUM} width={'16px'} height={'16px'}/>
          }
          {!isLiked &&
          <EmptyHeart fill={Colors.BLUE_MEDIUM} width={'16px'} height={'16px'}/>
          }
        </div>
        <div className={'count'}>{feed.likeCount + correctLikeCount}</div>
      </ToolBar>
    </Container>
  );
};

export default FeedItem;
