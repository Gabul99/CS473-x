import React, {useState} from 'react';
import styled from "styled-components";
import Colors from "../style/Colors";

const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${Colors.BLUE_LIGHT};
`;

const Input = styled.textarea`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
`;

const FactCheckbox = styled.input`
`;

const BottomBar = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  
  .desc {
    font-size: 11px;
    color: ${Colors.BLACK60};
    margin-right: auto;
  }
`;

const PostButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background-color: ${Colors.BLUE_MEDIUM};
  cursor: pointer;
  box-sizing: border-box;
  padding: 4px 8px;
  
  font-family: "bold", serif;
  color: ${Colors.WHITE100};
  
  &.inactive {
    background-color: ${Colors.GREY40};
  }
`;

const FeedInput = () => {
  const [content, setContent] = useState<string>('');
  const [isFact, setFact] = useState<boolean>(false);
  return (
    <Container>
      <Input placeholder={"What's happening?"} value={content} onChange={e => setContent(e.target.value)} wrap={'soft'} />
      <BottomBar>
        <FactCheckbox type={'checkbox'} checked={isFact} onChange={() => setFact(!isFact)} />
        <p className={'desc'}>This post is Fake news (It is not shown to other users)</p>
        <PostButton className={content === '' ? 'inactive' : ''}>POST</PostButton>
      </BottomBar>
    </Container>
  );
};

export default FeedInput;
