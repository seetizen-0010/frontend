import styled from "styled-components";
// 전체 화면 컨테이너
export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

// 스크롤 가능한 리스트 영역
export const ScrollContainer = styled.div`
    flex: 1;
    overflow-y: scroll;
    background-color: #f0f0f0;
    padding: 16px;
`;

// 게시판 리스트 컨테이너
export const BoardlistContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    background-color: #FAF8EA;
    border-radius: 12px;
`;

// 개별 게시물
export const BoardItem = styled.div`
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

export const Photo = styled.img`
    width: 100%;
    border-radius: 12px;
    cursor: pointer;
`;