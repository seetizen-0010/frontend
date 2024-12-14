import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../theme";
import { useCreatePostStore } from "../../store/modal/useModalStore";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const { viewCreatePostModal, toggleCreatePostModal } = useCreatePostStore();
  const navigate = useNavigate();
  const location = useLocation().pathname; // 현재 URL 정보 가져오기
  const isLocationMap = location === "/map";
  const isLocationHome = location === "/";
  return (
    <NavBarContainer>
      <IconBtn onClick={() => navigate("/")}>
        <img
          src={
            isLocationHome ? "/images/homeActive.png" : "/images/homeIcon.png"
          }
          alt="home"
        />
      </IconBtn>
      <IconBtn onClick={isLocationHome ? () => toggleCreatePostModal() : null}>
        <img className="secIcon" src="/images/newpostIcon.png" alt="newPost" />
      </IconBtn>
      <IconBtn onClick={() => navigate("/map")}>
        <img
          src={isLocationMap ? "/images/mapActive.png" : "/images/mapIcon.png"}
          alt="map"
        />
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
  position: fixed;
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
