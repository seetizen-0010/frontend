import { MapMarker } from "react-kakao-maps-sdk";

const imageSize = { width: 60, height: 60 };
const currentImageSize = { width: 70, height: 70 }; // current일 때 크기

function Marker({ id, name, position }) {
  const newName = name.replace(/\s+/g, ""); // 모든 공백 제거

  return (
    <>
      <MapMarker
        key={`${position.lat},${position.lng}`}
        position={position}
        image={{
          src: `/images/${newName}.png`,
          size: name === "current" ? currentImageSize : imageSize, // 조건에 따라 크기 변경
        }}
      />
    </>
  );
}

export default Marker;
