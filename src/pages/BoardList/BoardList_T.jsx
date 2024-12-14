import React, { useEffect, useState } from "react";
import {
    PageContainer,
    ScrollContainer,
    BoardlistContainer,
    BoardItem,
    ProfileImage,
    Photo,
    PostTitle,
    // AddressContainer,
    TagContainer,
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



const Boardlist = () => {
    const [data, setData] = useState([]); // 변수명 변경
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);

    const handleLikeClick = () => {
        setLiked(true);         // 좋아요를 눌렀을 때
        setDisliked(false);     // 싫어요는 해제
    };

    const handleDislikeClick = () => {
        setLiked(false);       // 좋아요는 해제
        setDisliked(true);      // 싫어요를 눌렀을 때
    };

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
        // 임시 하드코딩된 데이터
        const mockData = [
            {
                postid: 1,
                image: "https://via.placeholder.com/400",
                tag: ["생활안전", "공사중"],
                like: 10,
                dislike: 2,
                content : "여기 나무 쓰러졌어요",
                createdAt: "2024-12-31 00:00:00 UTC",
            },
            {
                postid: 2,
                image: "https://via.placeholder.com/400",
                tag: ["생활안전", "공사중"],
                like: 10,
                dislike: 8,
                content: "여기 나무 쓰러졌어요",
                createdAt: "2024-12-31 00:00:00 UTC",
            },
        ];

        // 데이터 포맷팅
        const formattedData = mockData.map((item) => ({
            postid: item.postid,
            image: item.image,
            tag: item.tag,
            like: item.like,
            dislike: item.dislike,
            content: item.content,
            createdAt: formatDateToKorean(item.createdAt),
        }));

        setData(formattedData);
    }, []);

    return (
        <PageContainer>
            <ScrollContainer>
                <BoardlistContainer>
                    {data.map((item) => (
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
                            <TagContainer className="tag-container">
                                {Array.isArray(item.tag) && item.tag.length > 0 ? (
                                    item.tag.map((tag, index) => (
                                        <TagItem key={index} className="tag-item">{tag}</TagItem>
                                    ))
                                ) : (
                                    <p>태그가 없습니다</p>
                                )}
                            </TagContainer>

                            {/* 버튼들 */}
                            <ButtonContainer>
                                {/* 왼쪽 버튼들: 좋아요, 싫어요 */}
                                <LeftButtons>
                                    <Btn onClick={handleLikeClick} active={liked}>
                                        <GoThumbsup />
                                    </Btn>

                                    <Btn onClick={handleDislikeClick} active={disliked}>
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

                            <div>유용해요:{item.like}</div>
                            <div>별로에요:{item.dislilke}</div>

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

    );
};

export default Boardlist;
