import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
// import styled from "styled-components";
import { useCreatePostStore } from "./store/modal/useModalStore";
import CreatPostModal from "./components/modal/CreatePostModal/CreatPostModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Notification from "./components/Nofitication";

function App() {
  const { viewCreatePostModal } = useCreatePostStore();
  return (
    <div>
      <ToastContainer
        autoClose={1500}
        pauseOnHover
        theme="light"
        position="bottom-right"
      />
      {viewCreatePostModal && <CreatPostModal />}
      <BrowserRouter>
        <Notification/>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
