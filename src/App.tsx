import React from 'react';
import styled from 'styled-components';
import './App.css';
import Colors from "./style/Colors";
import LoginPage from "./LoginPage";
import {useRecoilValue} from "recoil";
import {userAtom} from "./store/UserAtom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${Colors.WHITE100};
`;

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <Container>
      {user === null && <LoginPage />}
    </Container>
  );
}

export default App;
