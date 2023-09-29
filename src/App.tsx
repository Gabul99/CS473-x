import React from 'react';
import styled from 'styled-components';
import './App.css';
import Colors from "./style/Colors";
import LoginPage from "./LoginPage";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${Colors.WHITE100};
`;

function App() {
  return (
    <Container>
      <LoginPage />
    </Container>
  );
}

export default App;
