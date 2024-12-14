import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import styled from "styled-components";
function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
const AppWrapper = styled.div`
  height: 100dvh;
`;
