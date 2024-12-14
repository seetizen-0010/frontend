import React, { useState, useEffect } from "react";
import { Map, Polyline } from "react-kakao-maps-sdk";
import Marker from "../../components/map/Marker";
import Myposition from "../../components/map/MyPosition";
import { useCreatePostStore } from "../../store/modal/useModalStore";
import styled from "styled-components";
import { Container } from "../../styles/PageContainer.styles";
import { useNavigate } from "react-router-dom";
const datas = [
  { id: 1, name: "Place 1", lat: 33.451022, lng: 126.570045 },
  { id: 2, name: "Place 2", lat: 33.450512, lng: 126.570242 },
  { id: 3, name: "Place 3", lat: 33.450892, lng: 126.570893 },
  { id: 4, name: "Place 4", lat: 33.450113, lng: 126.570113 },
  { id: 5, name: "Place 5", lat: 33.451342, lng: 126.570589 },
];

function MapPage() {
  // 사용자 위치를 상태로 관리
  const [location, setLocation] = useState({ lat: 33.450701, lng: 126.570667 });
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  const [directions, setDirections] = useState(null);
  const restKey = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const [isPureMapPage, setIsPureMapPage] = useState(true);

  const { viewCreatePostModal, toggleCreatePostModal } = useCreatePostStore();
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
    // Geolocation API를 사용하여 현재 위치 가져오기
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

            {isPureMapPage ? (
              <Marker id="1" position={location} name="mark" />
            ) : (
              datas.map((data) => (
                <Marker
                  id="1"
                  key={data.id}
                  position={{ lat: data.lat, lng: data.lng }}
                  name="mark"
                />
              ))
            )}
            <Myposition lat={location.lat} lng={location.lng} />

            {/* Polyline을 사용하여 경로 데이터에 맞는 선 그리기 */}
            <Polyline
              path={pathData} // 경로 데이터
              strokeColor="#FF0000" // 선 색상
              strokeOpacity={1} // 선 불투명도
              strokeWeight={4} // 선 두께
            />
          </Map>
        ) : (
          <p>현재 위치를 가져오는 중...</p>
        )}
      </MapContainer>
      {/* 경로 데이터를 출력 */}
      {/* {directions && (
        <div>
          <h3>경로 정보</h3>
          <pre>{JSON.stringify(directions, null, 2)}</pre>
        </div>
      )} */}
    </Container>
  );
}

export default MapPage;

const MapContainer = styled.div`
  position: relative;
  height: 100%;
`;
