import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../apis/axiosIntance";
import { Container } from "../../styles/PageContainer.styles";
import { getData } from "../../apis/boardList/boardAxios";
import {
    PageContainer,
    ScrollContainer,
    GatContainer,
    BoardlistContainer,
    BoardItem,
    ProfileImage,
    Photo,
    PostTitle,
    // AddressContainer,
    TagsContainer,
    TagItem,
    ButtonContainer,
    LeftButtons,
    RightButton,
    Button,
    Btn,
    ContentContainer
} from "../../styles/BoardListStyles";

import { GoThumbsup } from "react-icons/go";
import { GoThumbsdown } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { GoReport } from "react-icons/go";
import styled from "styled-components";
import { COLORS } from "../../theme";
const tags = [
    "생활 안전",
    "교통 안전",
    "화재 안전",
    "재난 안전",
    "공사중",
    "기타",
  ];

const Boardlist = () => {
    const [data, setData] = useState([]); // 변수명 변경
    const [location, setLocation] = useState({ lat: 33.450701, lng: 126.570667 });
    const [isLocationLoaded, setIsLocationLoaded] = useState(false);
    const [likedStates, setLikedStates] = useState([]);
    const [dislikedStates, setDislikedStates] = useState([]);
    const [choicedTag, setChoicedTag] = useState("");
    const [filteringDatas, setFilteringDatas] = useState(null);
    

    const initializeStates = (dataLength) => {
        setLikedStates(Array(dataLength).fill(false));
        setDislikedStates(Array(dataLength).fill(false));
    };

    const handleLikeClick = (index) => {
        setLikedStates((prev) =>
            prev.map((liked, i) => (i === index ? true : liked))
        );
        setDislikedStates((prev) =>
            prev.map((disliked, i) => (i === index ? false : disliked))
        );
    };

    const handleDislikeClick = (index) => {
        setDislikedStates((prev) =>
            prev.map((disliked, i) => (i === index ? true : disliked))
        );
        setLikedStates((prev) =>
            prev.map((liked, i) => (i === index ? false : liked))
        );
    };
    // const [liked, setLiked] = useState(false);
    // const [disliked, setDisliked] = useState(false);

    // const handleLikeClick = () => {
    //     setLiked(true);         // 좋아요를 눌렀을 때
    //     setDisliked(false);     // 싫어요는 해제
    // };

    // const handleDislikeClick = () => {
    //     setLiked(false);       // 좋아요는 해제
    //     setDisliked(true);      // 싫어요를 눌렀을 때
    // };

    // 요일 변환 함수
    // 시간 변환 함수
    const formatDateToKorean = (dateString) => {
    // "2024-12-31 00:00:00 UTC"를 "2024-12-31T00:00:00Z" 형식으로 변환
        const formattedDateString = dateString.replace(" ", "T").replace(" UTC", "Z");

    // Date 객체 생성
        const date = new Date(formattedDateString);

    // 한국 표준시(KST)로 변환: UTC에서 9시간을 더해줌
        const kstOffset = 9 * 60; // 9시간 (KST는 UTC+9)
        date.setMinutes(date.getMinutes() + kstOffset);

    // 년도, 월, 날짜, 시간 포맷
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 0부터 시작하므로 1을 더함
        const day = date.getDate(); // 날짜
        const hours = String(date.getHours()).padStart(2, "0"); // 2자리 시간
        const minutes = String(date.getMinutes()).padStart(2, "0"); // 2자리 분

        return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
    };
  useEffect(() => {
    if (choicedTag !== "") {
      const newFilterDatas = data.filter((board) =>
        board.tag.includes(choicedTag)
      );
      setFilteringDatas(newFilterDatas);
      console.log("datas:",newFilterDatas);
    }
  }, [choicedTag]);
    // 데이터 호출
   useEffect(() => {
     if (isLocationLoaded) {
       const fetchBoardData = async () => {
         const data = {
           latitude: location.lat,
           longitude: location.lng,
         };
         try {
           const response = await getData(data); // getData 함수 호출
           setData(response.data); // 데이터 상태 저장
           setFilteringDatas(response.data)

           initializeStates(response.data.length)
           console.log("게시글 데이터:", response.data);
         } catch (error) {
           console.error("게시글 데이터를 가져오는 데 실패했습니다:", error);
         }
       };
       fetchBoardData();
     }
   }, [isLocationLoaded, location]);
     useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
    
              setLocation({ lat: latitude, lng: longitude });
              setIsLocationLoaded(true); // 위치 로드 완료
            },
            (error) => {
              console.error("현재 위치를 가져오지 못했습니다:", error);
              alert("현재 위치를 가져오지 못했습니다. 위치 권한을 확인해주세요.");
            }
          );
        } else {
          alert("Geolocation API를 지원하지 않는 브라우저입니다.");
        }
      }, []);

    return (
        <Container>
            <PageContainer>
                <ScrollContainer>
                        <TagContainer>
                             {tags.map((tag, index) => (
                                <Tag
                                $isSelected={choicedTag === tag}
                                onClick={() => setChoicedTag(tag)}
                                key={index}
                                >
                                    {tag}
                                </Tag>
                              ))}
                          </TagContainer>
                    <BoardlistContainer>
                                   
                        {filteringDatas?.map((item, index) => (
                            <BoardItem key={item.postid}>
                            {/* 프로필 이미지와 사용자명 */}
                                <PostTitle>
                                    <ProfileImage src="/images/profile.png" alt="프로필 이미지" />
                                    <div>공공일공</div>
                                </PostTitle>
                                {/* 주소
                                <AddressContainer>
                                    <div> {item.address}</div>
                                </AddressContainer> */}
    
                                {/* 이미지 */}
                                <Photo src={item.image} alt="게시물 이미지" />
                                {/* 태그 컨테이너 */}
                                <TagsContainer className="tag-container">
                                    {Array.isArray(item.tag) && item.tag.length > 0 ? (
                                        item.tag.map((tag, index) => (
                                            <TagItem key={index} className="tag-item">{tag}</TagItem>
                                        ))
                                    ) : (
                                        <p>태그가 없습니다</p>
                                    )}
                                </TagsContainer>
    
                                {/* 버튼들 */}
                                <ButtonContainer>
                                    {/* 왼쪽 버튼들: 좋아요, 싫어요 */}
                                    <LeftButtons>
                                        <Btn onClick={() => handleLikeClick(index)} active={likedStates[index]}>
                                            <GoThumbsup />
                                        </Btn>
    
                                        <Btn onClick={() => handleDislikeClick(index)} active={dislikedStates[index]}>
                                            <GoThumbsdown/>
                                        </Btn>
                                        <Button>
                                            <GoComment />
                                        </Button>
                                    </LeftButtons> 
    
                                    {/* 오른쪽 신고 버튼 */}
                                    <RightButton>
                                        <Button>
                                            <GoReport />
                                        </Button>
                                    </RightButton>
                                </ButtonContainer>
    
                                <div>유용해요:{item.likes}</div>
                                <div>별로에요:{item.dislikes}</div>
    
                                {/* content 출력 */}
                                {/* content 출력 */}
                                <ContentContainer>
                                    {item.content ? item.content : "내용이 없습니다"} {/* content가 없을 경우 기본 메시지 출력 */}
                                </ContentContainer>
    
                                {/* 작성 요일 */}
                                <div>{item.createdAt}</div>
                            </BoardItem>
                        ))}
                    </BoardlistContainer>
                </ScrollContainer>
            </PageContainer>
            </Container>
        );
    };

export default Boardlist;
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  z-index: 1000;
  background-color:#FAF8EA;
  padding:5px;
`;

const Tag = styled.div`
  padding: 10px 15px;
  background-color: ${(props) => (props.$isSelected ? "#b8cbad" : "#607b51")};
  color: ${(props) => (props.$isSelected ? "#586053" : "white")};
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
`;

