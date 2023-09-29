import React from 'react';
import styled from 'styled-components';
import './App.css';
import Colors from "./style/Colors";
import LoginPage from "./pages/LoginPage";
import {useRecoilValue} from "recoil";
import {userAtom} from "./store/UserAtom";
import UserType from "./data/UserEnum";
import FeedPage from "./pages/FeedPage";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${Colors.WHITE100};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <Container>
      {user === null && <LoginPage />}
      {user?.userType !== UserType.ADMIN && <FeedPage />}
    </Container>
  );
}

export default App;
