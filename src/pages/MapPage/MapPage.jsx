import React, { useState, useEffect } from "react";
import { Map, Polyline } from "react-kakao-maps-sdk";
import Marker from "../../components/map/Marker";
import Myposition from "../../components/map/MyPosition";
import { useCreatePostStore } from "../../store/modal/useModalStore";
import styled from "styled-components";
import { Container } from "../../styles/PageContainer.styles";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../theme";
import { getData } from "../../apis/boardList/boardAxios";
import { useLocation } from "react-router-dom";
const tags = [
  "생활 안전",
  "교통 안전",
  "화재 안전",
  "재난 안전",
  "공사중",
  "기타",
];
function MapPage() {
  // 사용자 위치를 상태로 관리
  const [location, setLocation] = useState({ lat: 33.450701, lng: 126.570667 });
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  const [isPureMapPage, setIsPureMapPage] = useState(false);
  const { viewCreatePostModal, toggleCreatePostModal } = useCreatePostStore();
  const [boardDatas, setBoardDatas] = useState(null);
  const [filteringDatas, setFilteringDatas] = useState(null);
  const [choicedTag, setChoicedTag] = useState("");
  const currentLocation = useLocation(); // 현재 URL 정보 가져오기
  const searchParams = new URLSearchParams(currentLocation.search); // 쿼리 파라미터 추출

  // 쿼리 파라미터 값 가져오기
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const navigate = useNavigate();

  useEffect(() => {
    console.log(isPureMapPage);
  }, [isPureMapPage]);
  useEffect(() => {
    if (choicedTag !== "") {
      const newFilterDatas = boardDatas.filter((board) =>
        board.tag.includes(choicedTag)
      );
      setFilteringDatas(newFilterDatas);
    }
  }, [choicedTag]);

  useEffect(() => {
    if (isLocationLoaded) {
      const fetchBoardData = async () => {
        const data = {
          latitude: location.lat,
          longitude: location.lng,
        };
        try {
          const response = await getData(data);
          setBoardDatas(response.data);
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
      <MapContainer>
        {isLocationLoaded ? (
          <Map
            level={3} // 지도 확대 레벨
            center={location}
            style={{ width: "100%", height: "100dvh" }}
            className="mapContainer"
          >
            <Marker id="1" position={location} name="current" />

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
            {isPureMapPage ? (
              <Marker id="1" position={location} name="marker" />
            ) : (
              filteringDatas?.map((data) => (
                <Marker
                  id={data.id}
                  key={data.id}
                  position={{ lat: data.latitude, lng: data.longitude }}
                  name={choicedTag}
                />
              ))
            )}
            <Myposition lat={location.lat} lng={location.lng} />
          </Map>
        ) : (
          <Loading>
            <p>데이터 가져오는 중...</p>
          </Loading>
        )}
      </MapContainer>
    </Container>
  );
}

export default MapPage;

const MapContainer = styled.div`
  position: relative;
  height: 100%;
`;
const TagContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  z-index: 1000;
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
const Loading = styled.div`
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
