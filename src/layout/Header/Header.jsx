import React from "react";
import styled from "styled-components";
import { COLORS } from "../../theme";
// import logo from "/public/images/logo.png";
const Header = () => {
  return (
    <HeaderContainer>
      <img src="/images/logo.png" alt="logo" />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100vw;
  height: 80px;
  background-color: ${COLORS.sub};
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid ${COLORS.main};
  img {
    width: 35%;
    margin-top: 10px;
  }
`;
