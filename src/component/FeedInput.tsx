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
  padding: 4px 12px;
  
  color: ${Colors.WHITE100};
  
  &.inactive {
    background-color: ${Colors.GREY40};
  }
`;

interface Props {
  onSubmit: (content: string, isFake: boolean, completion: () => void) => void;
}

const FeedInput = ({ onSubmit }: Props) => {
  const [content, setContent] = useState<string>('');
  const [isFake, setFake] = useState<boolean>(false);

  const handlePost = () => {
    if (content === '') {
      window.alert('Please type something to post!')
      return;
    }
    onSubmit(content, isFake, () => {
      setContent('');
      setFake(false);
    })
  }

  return (
    <Container>
      <Input placeholder={"What's happening?"} value={content} onChange={e => setContent(e.target.value)} wrap={'soft'} />
      <BottomBar>
        <FactCheckbox type={'checkbox'} checked={isFake} onChange={() => setFake(!isFake)} />
        <p className={'desc'}>This post is Fake news (Fake news or not is not visible to others.)</p>
        <PostButton className={content === '' ? 'inactive' : ''} onClick={handlePost}>Post</PostButton>
      </BottomBar>
    </Container>
  );
};

export default FeedInput;
