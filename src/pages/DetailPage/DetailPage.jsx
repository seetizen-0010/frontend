import React, { useEffect, useState } from "react";
import { getDetailData } from "../../apis/boardList/boardAxios";
import { Container } from "../../styles/PageContainer.styles";
import { useParams } from "react-router-dom";
import {
  BoardItem,
  Btn,
  Button,
  ButtonContainer,
  ContentContainer,
  LeftButtons,
  Photo,
  PostTitle,
  ProfileImage,
  RightButton,
  TagsContainer,
  TagItem,
} from "../../styles/BoardListStyles";
import { GoComment, GoReport, GoThumbsdown, GoThumbsup } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
const DetailPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleLikeClick = () => {
    setLiked(true); // 좋아요를 눌렀을 때
    setDisliked(false); // 싫어요는 해제
  };

  const handleDislikeClick = () => {
    setLiked(false); // 좋아요는 해제
    setDisliked(true); // 싫어요를 눌렀을 때
  };

  const handleLocationClick = () => {
    if (data && data.latitude && data.longitude) {
      navigate(`/map?lat=${data.latitude}&lng=${data.longitude}`);
    } else {
      alert("위치 정보가 없습니다.");
    }
  };

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await getDetailData(id); // 게시글 데이터 가져오기
        setData(response.data);
        setLoading(true);
      } catch (error) {
        console.error("게시글 데이터를 가져오는 데 실패", error);
      }
    };

    fetchBoardData();
  }, [id]);

  return (
    <Container className="container">
      <InnerContainer>
        {loading && (
          <BoardItem key={data.id}>
            {/* 프로필 이미지와 사용자명 */}
            <PostTitle>
              <ProfileImage src="/images/profile.png" alt="프로필 이미지" />
              <div>공공일공</div>
            </PostTitle>

            {/* 이미지 */}
            <Photo
              src={process.env.REACT_APP_BASE_URL + "/images/" + data.imageId}
              alt="게시물 이미지"
            />

            {/* 태그 컨테이너 */}
            <TagsContainer className="tag-container">
              {Array.isArray(data.tag) && data.tag.length > 0 ? (
                data.tag.map((tag, index) => (
                  <TagItem key={index} className="tag-item">
                    {tag}
                  </TagItem>
                ))
              ) : (
                <p>태그가 없습니다</p>
              )}
            </TagsContainer>

            {/* 버튼들 */}
            <ButtonContainer>
              {/* 왼쪽 버튼들: 좋아요, 싫어요 */}
              <LeftButtons>
                <Btn onClick={handleLikeClick} active={liked}>
                  <GoThumbsup />
                </Btn>

                <Btn onClick={handleDislikeClick} active={disliked}>
                  <GoThumbsdown />
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

            <ButtonContainer>
              <LocationBtn onClick={handleLocationClick}>위치 확인</LocationBtn>
            </ButtonContainer>

            <div>유용해요: {data.likes}</div>
            <div>별로에요: {data.dislikes}</div>

            {/* content 출력 */}
            <ContentContainer>
              {data.content ? data.content : "내용이 없습니다"}{" "}
              {/* content가 없을 경우 기본 메시지 출력 */}
            </ContentContainer>

            <div>{data.createdAt}</div>
          </BoardItem>
        )}
      </InnerContainer>
    </Container>
  );
};

export default DetailPage;
const InnerContainer = styled.div`
  padding-bottom: 70px;
`;
const LocationBtn = styled.button`
  width: 30%;
  height: 25px;
  border-radius: 50px;
  color: #faf9f9;
  background-color: #f67878;
`;
