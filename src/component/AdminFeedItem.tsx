import React from 'react';
import {Feed} from "../data/Feed";
import styled from "styled-components";
import Colors from "../style/Colors";
import {ReactComponent as FillHeart} from "../icon/heart-solid.svg";
import axios from "axios";

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

const Content = styled.div<{isDeleted: boolean}>`
  width: 100%;
  font-size: 14px;
  overflow: hidden;
  word-break: break-all;
  color: ${props => props.isDeleted ? Colors.BLACK40 : Colors.BLACK100}
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
  
  .delete-text {
    font-size: 12px;
    color: ${Colors.RED_DEEP};
  }
`;

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.RED_MEDIUM};
  color: ${Colors.WHITE100};
  margin-left: 8px;
  box-sizing: border-box;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 8px;
`;

interface Props {
  feed: Feed;
  refresh: () => void;
}

const AdminFeedItem = ({ feed, refresh }: Props) => {

  const handleDelete = () => {
    if (window.confirm('Do you really want to delete this feed?')) {
      axios.put(`http://localhost:8080/feed/delete`, { feedId: feed.id })
        .then(() => {
          refresh()
        })
        .catch(() => {
          window.alert('Fail to delete!');
        })
    }
  }

  return (
    <Container>
      <Author>{feed.author}</Author>
      <Content isDeleted={feed.isDeleted}>{feed.content}</Content>
      <ToolBar>
        <FillHeart fill={Colors.BLUE_MEDIUM} width={'16px'} height={'16px'}/>
        <div className={'count'}>{feed.likeCount}</div>
        {!feed.isDeleted &&
        <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
        }
        {feed.isDeleted &&
          <span className={'delete-text'}>It is deleted.</span>
        }
      </ToolBar>
    </Container>
  );
};

export default AdminFeedItem;
