import React, {useState} from 'react';
import styled from "styled-components";
import Colors from "../style/Colors";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${Colors.BLUE_LIGHT};
  flex-shrink: 0;
`;

const Input = styled.textarea`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
`;

const BottomBar = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PostButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: ${Colors.BLUE_MEDIUM};
  cursor: pointer;
  box-sizing: border-box;
  padding: 4px 12px;
  margin-left: auto;
  
  color: ${Colors.WHITE100};
  
  &.inactive {
    background-color: ${Colors.GREY40};
  }
`;

interface Props {
  onSubmit: (content: string, completion: () => void) => void;
}

const FeedInput = ({ onSubmit }: Props) => {
  const [content, setContent] = useState<string>('');

  const handlePost = () => {
    if (content === '') {
      window.alert('Please type something to post!')
      return;
    }
    onSubmit(content, () => {
      setContent('');
    })
  }

  return (
    <Container>
      <Input placeholder={"What's happening?"} value={content} onChange={e => setContent(e.target.value)} wrap={'soft'} />
      <BottomBar>
        <PostButton className={content === '' ? 'inactive' : ''} onClick={handlePost}>Post</PostButton>
      </BottomBar>
    </Container>
  );
};

export default FeedInput;
