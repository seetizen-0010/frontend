import React, { useState, useEffect } from "react";
import { Container } from "../../styles/PageContainer.styles";
import { getData } from "../../apis/boardList/boardAxios";
import {
  PageContainer,
  ScrollContainer,
  BoardlistContainer,
  BoardItem,
  ProfileImage,
  Photo,
  PostTitle,
  TagsContainer,
  TagItem,
  ButtonContainer,
  LeftButtons,
  RightButton,
  Button,
  Btn,
  ContentContainer,
} from "../../styles/BoardListStyles";
import { GoThumbsup } from "react-icons/go";
import { GoThumbsdown } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { GoReport } from "react-icons/go";
import styled from "styled-components";
import { COLORS } from "../../theme";
import { useNavigate } from "react-router-dom";
const tags = [
  "생활 안전",
  "교통 안전",
  "화재 안전",
  "재난 안전",
  "공사중",
  "기타",
];

const Boardlist = () => {
  const [data, setData] = useState([]); // 전체 데이터
  const [filteringDatas, setFilteringDatas] = useState(null); // 필터링된 데이터
  const [location, setLocation] = useState({ lat: 33.450701, lng: 126.570667 });
  const [isLocationLoaded, setIsLocationLoaded] = useState(false); // 위치 로드 상태
  const [choicedTag, setChoicedTag] = useState(""); // 선택된 태그
  const [likedStates, setLikedStates] = useState([]);
  const [dislikedStates, setDislikedStates] = useState([]);
  const navigate = useNavigate(); // 초기 좋아요/싫어요 상태 설정
  const initializeStates = (dataLength) => {
    setLikedStates(Array(dataLength).fill(false));
    setDislikedStates(Array(dataLength).fill(false));
  };

  // 좋아요 버튼 클릭 핸들러
  const handleLikeClick = (index) => {
    setLikedStates((prev) =>
      prev.map((liked, i) => (i === index ? true : liked))
    );
    setDislikedStates((prev) =>
      prev.map((disliked, i) => (i === index ? false : disliked))
    );
  };

  // 싫어요 버튼 클릭 핸들러
  const handleDislikeClick = (index) => {
    setDislikedStates((prev) =>
      prev.map((disliked, i) => (i === index ? true : disliked))
    );
    setLikedStates((prev) =>
      prev.map((liked, i) => (i === index ? false : liked))
    );
  };

  // 한국 시간 형식으로 변환
  const formatDateToKorean = (dateString) => {
    const formattedDateString = dateString
      .replace(" ", "T")
      .replace(" UTC", "Z");
    const date = new Date(formattedDateString);
    const kstOffset = 9 * 60; // KST = UTC+9
    date.setMinutes(date.getMinutes() + kstOffset);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  };

  // 데이터 필터링
  useEffect(() => {
    if (choicedTag !== "") {
      const newFilterDatas = data.filter((board) =>
        board.tag.includes(choicedTag)
      );
      setFilteringDatas(newFilterDatas);
    } else {
      setFilteringDatas(data);
    }
  }, [choicedTag, data]);

  // 게시글 데이터 가져오기
  useEffect(() => {
    if (isLocationLoaded) {
      const fetchBoardData = async () => {
        const data = {
          latitude: location.lat,
          longitude: location.lng,
        };
        try {
          const response = await getData(data); // getData 함수 호출
          setData(response.data); // 전체 데이터 설정
          setFilteringDatas(response.data); // 필터링 데이터 초기화
          initializeStates(response.data.length); // 좋아요/싫어요 초기화
        } catch (error) {
          console.error("게시글 데이터를 가져오는 데 실패했습니다:", error);
        }
      };
      fetchBoardData();
    }
  }, [isLocationLoaded, location]);

  // 위치 정보 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setIsLocationLoaded(true);
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
  const navigateToDetailPage = (id) => {
    navigate(`/${id}`);
  };
  return (
    <Container>
      <PageContainer>
        <ScrollContainer>
          {/* 태그 컨테이너 */}
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

          {/* 게시글 리스트 */}
          <BoardlistContainer>
            {isLocationLoaded ? (
              filteringDatas?.length > 0 ? (
                filteringDatas.map((item, index) => (
                  <BoardItem
                    key={item.postid}
                    onClick={() => navigateToDetailPage(item.id)}
                  >
                    {/* 프로필 이미지와 사용자명 */}
                    <PostTitle>
                      <ProfileImage
                        src="/images/profile.png"
                        alt="프로필 이미지"
                      />
                      <div>공공일공</div>
                    </PostTitle>

                    {/* 이미지 */}
                    <Photo src={item.image} alt="게시물 이미지" />

                    {/* 태그 컨테이너 */}
                    <TagsContainer>
                      {item.tag.map((tag, index) => (
                        <TagItem key={index}>{tag}</TagItem>
                      ))}
                    </TagsContainer>

                    {/* 버튼들 */}
                    <ButtonContainer>
                      <LeftButtons>
                        <Btn
                          onClick={() => handleLikeClick(index)}
                          active={likedStates[index]}
                        >
                          <GoThumbsup />
                        </Btn>
                        <Btn
                          onClick={() => handleDislikeClick(index)}
                          active={dislikedStates[index]}
                        >
                          <GoThumbsdown />
                        </Btn>
                        <Button>
                          <GoComment />
                        </Button>
                      </LeftButtons>
                      <RightButton>
                        <Button>
                          <GoReport />
                        </Button>
                      </RightButton>
                    </ButtonContainer>

                    <div>유용해요: {item.likes}</div>
                    <div>별로에요: {item.dislikes}</div>

                    {/* 게시글 내용 */}
                    <ContentContainer>
                      {item.content ? item.content : "내용이 없습니다"}
                    </ContentContainer>

                    {/* 작성 시간 */}
                    <div>{formatDateToKorean(item.createdAt)}</div>
                  </BoardItem>
                ))
              ) : (
                <p>게시글이 없습니다.</p>
              )
            ) : (
              <p>데이터 가져오는 중...</p>
            )}
          </BoardlistContainer>
        </ScrollContainer>
      </PageContainer>
    </Container>
  );
};

export default Boardlist;

// 스타일 컴포넌트
const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  background-color: #faf8ea;
  padding: 5px;
`;

const Tag = styled.div`
  padding: 10px 15px;
  background-color: ${(props) =>
    props.$isSelected ? "#cad8d1" : `${COLORS.main}`};
  color: ${(props) => (props.$isSelected ? "#0d1508" : "#ffffff")};
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
`;
