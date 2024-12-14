import styled from "styled-components";
// 전체 화면 컨테이너
export const PageContainer = styled.div`
    display: flex;
    background-color: #FAF8EA;
    flex-direction: column;
    height: 100vh;
`;

// 스크롤 가능한 리스트 영역
export const ScrollContainer = styled.div`
    flex: 1;
    overflow-y: scroll;
    height: 100vh;
`;

// GatContainer 스타일 정의
export const GatContainer = styled.div`
    display: flex;
    justify-content: center; /* 태그 중앙 정렬 */
    align-items: center;
    padding: 10px 0; /* 위아래 약간의 간격 */
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

// 프로필 이미지와 사용자명을 담을 컨테이너 (배경색, 테두리 없이 스타일링)
export const PostTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: bold; /* 사용자명 강조 */
    color: #333; /* 글자 색상 설정 */
    padding-bottom: 4px; /* 사용자명 아래 간격 */
`;

// 프로필 이미지 스타일
export const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`;

// 주소 컨테이너 (왼쪽 정렬)
export const AddressContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 왼쪽 정렬 */
    gap: 4px; /* 주소와 다른 내용 사이 여백 */
    color: #555; /* 주소 색상 설정 */
    font-size: 14px;
    margin-top: 5px;
`;


export const Photo = styled.img`
    width: 100%;
    border-radius: 12px;
    cursor: pointer;
    margin-top: 20px; /* 사진 위쪽 간격 */
    margin-bottom: 10px; /* 사진 위쪽 간격 */
`;


// 태그 컨테이너 (배경색과 테두리 없이 스타일링, 가로 배치)
export const TagsContainer = styled.div`
    display: flex;
    gap: 8px; /* 태그 간의 간격 */
    align-items: center; /* 세로 정렬 */
    padding-top: 3px; /* 이미지와 태그 사이의 여백 */
    margin-bottom: 10px; /* 사진 위쪽 간격 */
`;

// 태그 아이템 (배경색과 테두리 없이 스타일링)
export const TagItem = styled.div`
    font-size: 16px;
    display: inline-flex; /* Flex 컨테이너로 설정 */
    align-items: center; /* 수직 정렬 */
    justify-content: center; /* 수평 정렬 */
    color: #555; /* 태그 글자 색 */
    padding: 6px 10px; /* 태그 내부 여백 */
    border: 1px solid #ddd; /* 테두리 색 */
    border-radius: 12px; /* 둥근 테두리 */
`;

// 버튼 컨테이너 (버튼을 가로로 정렬)
export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between; /* 양 끝 정렬 */
    align-items: center; /* 수직 정렬 */
    margin-top: 8px; 
    margin-bottom: 8px; 
    padding: 0 1px; /* 좌우 여백 */
`;

// 왼쪽 버튼들을 묶는 컨테이너 (좋아요, 싫어요, 댓글)
export const LeftButtons = styled.div`
    display: flex;
    gap: 2px; /* 버튼 간 간격 */
    justify-content: flex-start; /* 왼쪽 정렬 */
`;

// 오른쪽 버튼을 위한 컨테이너 (신고 버튼)
export const RightButton = styled.div`
    display: flex;
    justify-content: flex-end; /* 오른쪽 정렬 */
    width: 100%; /* 전체 너비를 사용해서 오른쪽 정렬 */
`;

// 버튼 스타일 (공통)
export const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 8px; /* 동일한 패딩 적용 */

     svg {
        font-size: 24px; /* 크기 동일하게 설정 */
    }
    
`;

export const Btn = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 8px; /* Button과 동일한 패딩 */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s;

    /* 클릭된 상태일 때 색상 변경 */
    ${(props) =>
        props.active &&
        `
        background-color: #3E7C72;
        color: white;
    `}

    /* 기본 아이콘 색상 */
    svg {
        font-size: 24px; /* 크기 동일하게 설정 */
    }
`;

export const ContentContainer = styled.div`
    background-color: transparent; /* 배경 투명 */
    border: none; /* 선 없애기 */
    padding: 12px 0; /* 위아래 여백 */
    font-size: 16px; /* 글자 크기 */
    color: #1E1E1E; /* 글자 색 */
    line-height: 1.5; /* 줄 간격 */
    word-wrap: break-word; /* 긴 단어가 넘어가지 않게 */
`;
