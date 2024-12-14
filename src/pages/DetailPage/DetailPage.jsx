import React, { useEffect, useState } from "react";
import { getDetailData } from "../../apis/boardList/boardAxios";
import { Container } from "../../styles/PageContainer.styles";
const DetailPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await getDetailData(1); // getData 함수 호출
        console.log(response.data);
        setData(data.data);
      } catch (error) {
        console.error("게시글 데이터를 가져오는 데 실패", error);
      }
    };

    fetchBoardData();
  }, []);
  return <Container>DetailPage</Container>;
};

export default DetailPage;
