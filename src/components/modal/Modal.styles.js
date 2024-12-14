import styled from "styled-components";
export const FixedContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 5;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);
  background: rgb(0, 0, 0, 0.4);
`;
export const DeleteBox = styled.div`
  width: 35px;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 1.2rem;
    color: rgba(0, 0, 0, 0.5);
    transition: 250ms transform ease-in-out, 200ms color ease-in-out;
    &:hover {
      transform: scale(1.15);
      color: rgba(0, 0, 0, 0.8);
    }
  }
`;
