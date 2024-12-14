import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import styled from "styled-components";
import { useCreatePostStore } from "./store/modal/useModalStore";
import CreatPostModal from "./components/modal/CreatePostModal/CreatPostModal";
function App() {
  const { viewCreatePostModal } = useCreatePostStore();
  return (
    <div>
      {viewCreatePostModal && <CreatPostModal />}
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
