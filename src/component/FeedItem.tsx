import React from 'react';
import styled from "styled-components";
import {ReactComponent as EmptyHeart} from '../icon/heart-regular.svg'
import {ReactComponent as FillHeart} from '../icon/heart-solid.svg'
import Colors from "../style/Colors";
import {Feed} from "../data/Feed";

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
  return (
    <Container>
      <Author>{feed.author}</Author>
      <Content>{feed.content}</Content>
      <ToolBar>
        <div className={'icon-button'}>
          {feed.isLiked &&
          <FillHeart fill={Colors.BLUE_MEDIUM} width={'16px'} height={'16px'}/>
          }
          {!feed.isLiked &&
          <EmptyHeart fill={Colors.BLUE_MEDIUM} width={'16px'} height={'16px'}/>
          }
        </div>
        <div className={'count'}>{feed.likeCount}</div>
      </ToolBar>
    </Container>
  );
};

export default FeedItem;