import { MapMarker } from "react-kakao-maps-sdk";
const imageSize = { width: 40, height: 50 };

function Marker({ id, name, position }) {
  return (
    <>
      <MapMarker
        key={`${position.lat},${position.lng}`}
        position={position}
        image={{
          src: `/images/marker.png`,
          size: imageSize,
        }}
      />
    </>
  );
}

export default Marker;
