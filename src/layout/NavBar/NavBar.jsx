import React from "react";
import styled from "styled-components";
import { COLORS } from "../../theme";
import { useCreatePostStore } from "../../store/modal/useModalStore";

const NavBar = () => {
  const { viewCreatePostModal, toggleCreatePostModal } = useCreatePostStore();
  const handleNewPostClick = () => {};
  return (
    <NavBarContainer>
      <IconBtn>
        <img src="/images/homeIcon.png" alt="home" />
      </IconBtn>
      <IconBtn onClick={() => toggleCreatePostModal()}>
        <img className="secIcon" src="/images/newpostIcon.png" alt="newPost" />
      </IconBtn>
      <IconBtn>
        <img src="/images/mapIcon.png" alt="map" />
      </IconBtn>
    </NavBarContainer>
  );
};

export default NavBar;
const NavBarContainer = styled.div`
  background-color: ${COLORS.sub};
  width: calc(100vw);
  height: 70px;
  border-radius: 50px 50px 0 0;
  border-top: 3px solid ${COLORS.main};
  display: flex;
  justify-content: space-around;
  position: sticky;
  z-index: 5;
`;

const IconBtn = styled.button`
  background-color: transparent;
  img {
    width: 38px;
    height: 38px;
  }
  .secIcon {
    width: 54px;
    height: 54px;
    margin-bottom: 4px;
  }
`;
