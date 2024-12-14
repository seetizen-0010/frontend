import { useMap } from "react-kakao-maps-sdk";
import { useMemo } from "react";
import styled from "styled-components";
// 내 위치로 가는 함수
const { kakao } = window;

function Myposition({ lat, lng }) {
  const map = useMap();
  const bounds = useMemo(() => {
    const newBounds = new kakao.maps.LatLngBounds();

    newBounds.extend(new kakao.maps.LatLng(lat, lng));

    return newBounds;
  }, [lat, lng]);

  return (
    <MyPositionBtn type="button" onClick={() => map.setBounds(bounds)}>
      +
    </MyPositionBtn>
  );
}

export default Myposition;
const MyPositionBtn = styled.button`
  z-index: 1;
  position: absolute;
  bottom: 10px;
  right: 3px;
  width: 32px;
  height: 32px;
  background-color: #ffffff;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;
