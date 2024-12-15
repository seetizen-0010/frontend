import React, { useState, useEffect } from "react";
import { CustomOverlayMap, Map, Polyline } from "react-kakao-maps-sdk";
import Marker from "../../components/map/Marker";
import Myposition from "../../components/map/MyPosition";
import { useCreatePostStore } from "../../store/modal/useModalStore";
import styled from "styled-components";
import { Container } from "../../styles/PageContainer.styles";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../theme";
import { getData } from "../../apis/boardList/boardAxios";
import { useLocation } from "react-router-dom";

import "./MapPage.css";

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
  const [boardDatas, setBoardDatas] = useState([]);
  const [filteringDatas, setFilteringDatas] = useState(null);
  const [choicedTag, setChoicedTag] = useState("");
  const currentLocation = useLocation(); // 현재 URL 정보 가져오기
  const searchParams = new URLSearchParams(currentLocation.search); // 쿼리 파라미터 추출
  const [pureMapMarkerInfo, setPureMapMarkerInfo] = useState({});

  // 쿼리 파라미터 값 가져오기
  const pinLat = searchParams.get("lat");
  const pinLng = searchParams.get("lng");

  useEffect(() => {
    if (pinLat && pinLng) {
      setLocation({ lat: parseFloat(pinLat), lng: parseFloat(pinLng) });
      setIsPureMapPage(true);
    } else {
      setIsPureMapPage(false);
    }
  }, [pinLat, pinLng]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("page:", isPureMapPage);
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
    if (isPureMapPage && boardDatas.length > 0) {
      const board = boardDatas.find(board => board.latitude == pinLat && board.longitude == pinLng);
      console.log(board)
      setPureMapMarkerInfo(board);
    }
  },[isPureMapPage, boardDatas])

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
            level={5}
            center={pinLat && pinLng ? { lat: pinLat, lng: pinLng } : location}
            style={{ width: "100%", height: "100dvh" }}
            className="mapContainer"
          >
            <Marker id="1" position={location} name="current" />

            {!isPureMapPage && (
              <TagContainer>
                {tags.map((tag, index) => (
                  <Tag
                    $isSelected={choicedTag === tag}
                    onClick={() => setChoicedTag(tag)}
                    key={index}
                  >
                    # {tag}
                  </Tag>
                ))}
              </TagContainer>
            )}
            {isPureMapPage ? (
              <>
                <Marker
                  id="1"
                  position={{ lat: pureMapMarkerInfo.latitude, lng: pureMapMarkerInfo.longitude }}
                  name="marker"
                />
                  <CustomOverlayMap
                    position={{
                      lat: pureMapMarkerInfo.latitude, // 위도
                      lng: pureMapMarkerInfo.longitude, // 경도
                    }}
                  >
                    <div
                      className="map-marker-info"
                    >
                      <div style={{ marginBottom: "5px", fontWeight: "bold" }}>
                        {pureMapMarkerInfo.address}
                      </div>
                      <div style={{ marginBottom: "5px", color: "#888" }}>
                        {new Date(pureMapMarkerInfo.createdAt).toLocaleString()}{" "}
                        {/* 날짜 포맷 변경 */}
                      </div>
                      <div
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={pureMapMarkerInfo.content} // 전체 내용을 툴팁으로 표시
                      >
                        {pureMapMarkerInfo.content}
                      </div>
                    </div>
                  </CustomOverlayMap>
              </>
            ) : (
              filteringDatas?.map((data) => (
                <Marker
                  id={data.id}
                  key={data.id}
                  position={{ lat: data.latitude, lng: data.longitude }}
                  name={choicedTag}
                  onClick={() => navigate(`/${data.id}`)} // 해당 데이터 ID로 이동
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
  gap: 10px;
  z-index: 1000;
  width: 100%;
  overflow-x: scroll; /* 가로 스크롤 유지 */
  white-space: nowrap;
  -webkit-overflow-scrolling: touch; /* 모바일 스크롤 부드럽게 */

  /* 스크롤바 숨김 (크로스 브라우저 대응) */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
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
