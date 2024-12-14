import React, { useEffect, useState } from "react";
import { getDetailData, getImage } from "../../apis/boardList/boardAxios";
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
  TagContainer,
  TagItem,
} from "../../styles/BoardListStyles";
import { GoComment, GoReport, GoThumbsdown, GoThumbsup } from "react-icons/go";

const DetailPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { id } = useParams();

  const handleLikeClick = () => {
    setLiked(true); // 좋아요를 눌렀을 때
    setDisliked(false); // 싫어요는 해제
  };

  const handleDislikeClick = () => {
    setLiked(false); // 좋아요는 해제
    setDisliked(true); // 싫어요를 눌렀을 때
  };

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await getDetailData(id); // getData 함수 호출
        console.log(response.data);
        setData(response.data);
        setLoading(true);
      } catch (error) {
        console.error("게시글 데이터를 가져오는 데 실패", error);
      }
    };

    fetchBoardData();
  }, [id]);
  return (
    <Container class="container">
      {loading && (
        <BoardItem key={data.id}>
          {/* 프로필 이미지와 사용자명 */}
          <PostTitle>
            <ProfileImage src="/images/profile.png" alt="프로필 이미지" />
            <div>공공일공</div>
          </PostTitle>
          {/* 주소
      <AddressContainer>
          <div> {address}</div>
      </AddressContainer> */}

          {/* 이미지 */}
          <Photo src={process.env.REACT_APP_BASE_URL+"/images/"+data.imageId} alt="게시물 이미지" />
          {/* 태그 컨테이너 */}
          <TagContainer className="tag-container">
            {Array.isArray(data.tag) && data.tag.length > 0 ? (
              data.tag.map((tag, index) => (
                <TagItem key={index} className="tag-item">
                  {tag}
                </TagItem>
              ))
            ) : (
              <p>태그가 없습니다</p>
            )}
          </TagContainer>

          {/* 버튼들 */}
          <ButtonContainer>
            {/* 왼쪽 버튼들: 좋아요, 싫어요 */}
            <LeftButtons>
              <Btn onClick={() => handleLikeClick()} active={liked}>
                <GoThumbsup />
              </Btn>

              <Btn onClick={() => handleDislikeClick()} active={disliked}>
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

          <div>유용해요:{data.likes}</div>
          <div>별로에요:{data.dislikes}</div>

          {/* content 출력 */}
          {/* content 출력 */}
          <ContentContainer>
            {data.content ? data.content : "내용이 없습니다"}{" "}
            {/* content가 없을 경우 기본 메시지 출력 */}
          </ContentContainer>

          {/* 작성 요일 */}
          <div>{data.createdAt}</div>
        </BoardItem>
      )}
    </Container>
  );
};

export default DetailPage;
