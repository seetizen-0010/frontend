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

import axios from "axios";
const datas = [
  { id: 1, name: "Place 1", lat: 33.451022, lng: 126.570045 },
  { id: 2, name: "Place 2", lat: 33.450512, lng: 126.570242 },
  { id: 3, name: "Place 3", lat: 33.450892, lng: 126.570893 },
  { id: 4, name: "Place 4", lat: 33.450113, lng: 126.570113 },
  { id: 5, name: "Place 5", lat: 33.451342, lng: 126.570589 },
];
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
  // 경로 데이터 (pathData)
  const pathData = [
    { lat: 37.394725518530834, lng: 127.11015051307636 },
    { lat: 37.394469584427156, lng: 127.10991634747967 },
    { lat: 37.394469584427156, lng: 127.10966790676201 },
    // 추가적인 좌표들...
  ];
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
          const response = await getData(data); // getData 함수 호출
          setBoardDatas(response.data); // 데이터 상태 저장
          console.log("게시글 데이터:", response.data);
        } catch (error) {
          console.error("게시글 데이터를 가져오는 데 실패했습니다:", error);
        }
      };

      fetchBoardData();
    }
  }, [isLocationLoaded, location]);

  // useEffect(() => {
  //   if (isLocationLoaded) fetchData();
  // }, [isLocationLoaded]);

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
            {/* <MapMarker position={location}>
            <div>현재 위치</div>
          </MapMarker> */}
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
              <Marker id="1" position={location} name="mark" />
            ) : (
              filteringDatas?.map((data) => (
                <Marker
                  id={data.id}
                  key={data.id}
                  position={{ lat: data.latitude, lng: data.longitude }}
                  name="mark"
                />
              ))
            )}
            <Myposition lat={location.lat} lng={location.lng} />
          </Map>
        ) : (
          <p>현재 위치를 가져오는 중...</p>
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

  background-color: ${(props) => (props.$isSelected ? "#b8cbad" : "#607b51")};
  color: ${(props) => (props.$isSelected ? "#586053" : "white")};
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
`;
