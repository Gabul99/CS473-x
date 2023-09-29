import React from 'react';
import styled from 'styled-components';
import './App.css';
import Colors from "./style/Colors";
import LoginPage from "./pages/LoginPage";
import {useRecoilValue} from "recoil";
import {userAtom} from "./store/UserAtom";
import UserType from "./data/UserEnum";
import FeedPage from "./pages/FeedPage";
import AdminPage from "./pages/AdminPage";

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
      {user !== null && user.userType !== UserType.ADMIN && <FeedPage />}
      {user !== null && user.userType === UserType.ADMIN && <AdminPage />}
    </Container>
  );
}

export default App;
