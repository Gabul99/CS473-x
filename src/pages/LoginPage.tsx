import axios from 'axios';
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Colors from "../style/Colors";
import UserType from "../data/UserEnum";
import { useSetRecoilState } from "recoil";
import {userAtom} from "../store/UserAtom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  
  .title {
    font-size: 24px;
    font-family: "bold", serif;
  }
`;

const CenterArea = styled.div`
  width: 480px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid ${Colors.BLACK40};
  padding: 16px;
  box-sizing: border-box;
`;

const NicknameInput = styled.input``;

const NextButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${Colors.BLUE_MEDIUM};
  color: ${Colors.WHITE100};
  cursor: pointer;
`;

const ItemContainer = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  border-radius: 4px;
  gap: 4px;
  cursor: pointer;
  box-sizing: border-box;
  
  &:hover {
    background-color: ${Colors.BLACK08};
  }
  
  &.selected {
    background-color: ${Colors.BLACK08};
  }
  
  .reg-text {
    font-family: "regular", serif;
    color: ${Colors.BLACK60};
  }
  
  .bold-text {
    font-family: "bold", serif;
    color: ${Colors.BLACK80};
  }
`;

const LoginPage = () => {
  const [userType, setUserType] = useState<UserType | undefined>();
  const [nickname, setNickname] = useState<string>('');
  const setUserInfo = useSetRecoilState(userAtom);

  useEffect(() => {
    axios.get('https://cs473-test-b04585b2b629.herokuapp.com/')
      .then(res => console.log(res));
  }, []);

  const onEnter = () => {
    if (nickname === '' || !userType) {
      window.alert('Please type nickname!');
      return;
    }
    setUserInfo({
      nickname: nickname,
      userType: userType
    })
  }

  return (
    <Container>
      <h1 className={'title'}>CS473 - X</h1>
      <CenterArea>
        <Item className={userType === 'ADMIN' ? 'selected' : ''} name={'Admin'} teamNum={1} onClick={() => setUserType(UserType.ADMIN)} />
        <Item className={userType === 'POSITIVE' ? 'selected' : ''} name={'Positive Side'} teamNum={2} onClick={() => setUserType(UserType.POSITIVE)} />
        <Item className={userType === 'NEGATIVE' ? 'selected' : ''} name={'Negative Side'} teamNum={3} onClick={() => setUserType(UserType.NEGATIVE)} />
        <Item className={userType === 'AUDIENCE' ? 'selected' : ''} name={'Audience'} teamNum={4} onClick={() => setUserType(UserType.AUDIENCE)} />
      </CenterArea>
      {userType !== undefined &&
          <>
        <NicknameInput value={nickname} onChange={e => setNickname(e.target.value)} placeholder={'type your nickname'} />
            <NextButton onClick={onEnter}>
              Enter
            </NextButton>
          </>
      }
    </Container>
  );
};

interface ItemProps {
  className: string;
  name: string;
  teamNum: number;
  onClick: () => void;
}

const Item = ({ className, name, teamNum, onClick }: ItemProps) => {
  return <ItemContainer className={className} onClick={onClick}>
    <p className={'reg-text'}>
      I'm
    </p>
    <p className={'bold-text'}>
      {name}
    </p>
    <p className={'reg-text'}>
      {`(Team ${teamNum})`}
    </p>
  </ItemContainer>
}

export default LoginPage;
