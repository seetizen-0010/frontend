import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../../theme";
import { FixedContainer, DeleteBox } from "../Modal.styles";
import { useCreatePostStore } from "../../../store/modal/useModalStore";
import axios from "axios";
import { toast } from "react-toastify";
import { postData } from "../../../apis/boardList/boardAxios";

const CreatePostModal = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [contents, setContents] = useState("");
  const [address, setAddress] = useState(null);
  const [AxiosResponse, setAxiosResponse] = useState(null);
  const { viewCreatePostModal, toggleCreatePostModal } = useCreatePostStore();
  const [tags, setTags] = useState([
    { name: "생활 안전", isClick: false },
    { name: "교통 안전", isClick: false },
    { name: "화재 안전", isClick: false },
    { name: "재난 안전", isClick: false },
    { name: "공사중", isClick: false },
    { name: "기타", isClick: false },
  ]);
  const [dangers, setDangers] = useState([
    { name: "저위험", isClick: false },
    { name: "중위험", isClick: false },
    { name: "고위험", isClick: false },
  ]);
  const handleTags = (tag) => {
    const newTags = tags.map((mytag) =>
      mytag.name === tag.name ? { ...mytag, isClick: !mytag.isClick } : mytag
    );
    setTags(newTags);
  };
  const handleDangerBtns = (btn) => {
    const newBtns = dangers.map((mybtn) =>
      mybtn.name === btn.name ? { ...mybtn, isClick: !mybtn.isClick } : mybtn
    );
    setDangers(newBtns);
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    }
  };

  const handleUpload = async () => {
    if (!viewCreatePostModal) return;

    if (imageFile === null) {
      alert("이미지를 선택해주세요.");
      return;
    }

    const formdata = {
      image: imageFile,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/images`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("이미지 업로드 성공:", response.data.data);
      setAxiosResponse(response.data.data);
    } catch (error) {
      console.error("이미지 업로드 실패:", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const choicedTags = tags
      .filter((tag) => tag.isClick)
      .map((tag) => tag.name);
    const data = {
      content: contents,
      longitude: AxiosResponse?.longitude,
      latitude: AxiosResponse?.latitude,
      address: AxiosResponse?.address,
      tag: choicedTags,
      imageId: AxiosResponse?.imageId,
    };

    try {
      const response = await postData(data); // postData 함수 호출
      console.log("게시글 업로드 성공:", response);
      toast.info("게시글이 작성되었습니다.");
      toggleCreatePostModal();
    } catch (error) {
      console.error("게시글 업로드 실패:", error);
      toast.error("게시글 작성이 실패하였습니다. 다시 시도해주세요.");
    }
  };
  useEffect(() => {
    if (imageFile) {
      handleUpload();
    }
    console.log(imageFile);
  }, [imageFile]);
  return (
    <FixedContainer>
      <Container>
        <TopBox>
          <DeleteBox></DeleteBox>
          <div className="createNote__title">새 게시물</div>
          <DeleteBox
            onClick={() => toggleCreatePostModal()}
            className="createNote__close-btn"
          >
            <img src="/images/cancel.png" alt="cancel" />
          </DeleteBox>
        </TopBox>
        <BottomBox>
          <ImgUploadWrapper>
            <input type="file" id="img-upload" onChange={handleImageChange} />
            {imagePreview ? (
              <PreviewLabel htmlFor="img-upload">
                <img className="preview" src={imagePreview} alt="Preview" />
              </PreviewLabel>
            ) : (
              <ImgUploadLabel htmlFor="img-upload">
                <img
                  className="plus"
                  src="/images/uploadImg.png"
                  alt="upload"
                />
              </ImgUploadLabel>
            )}
          </ImgUploadWrapper>
          <TextBox>
            <InputContent
              onChange={(e) => setContents(e.target.value)}
              placeholder="상황을 설명해 주세요"
            />
          </TextBox>
          <PosBox>
            <Title>위험도</Title>
            <DangerBox>
              {dangers.map((danger, index) => (
                <DangerBtn
                  key={index}
                  name={danger.name}
                  $isClick={danger.isClick}
                  onClick={() => handleDangerBtns(danger)}
                >
                  {danger.name}
                </DangerBtn>
              ))}
            </DangerBox>
          </PosBox>
          <PosBox>
            <Title>위치</Title>
            <div className="pos">
              {AxiosResponse
                ? AxiosResponse.address
                : "사진의 위치가 표시 됩니다."}
            </div>
          </PosBox>
          <TagBox>
            <Title>태그 추가</Title>
            <Tags>
              {tags.map((tag, index) => (
                <TagBtn
                  key={index}
                  onClick={() => handleTags(tag)}
                  $isClick={tag.isClick}
                >
                  {tag.name}
                </TagBtn>
              ))}
            </Tags>
          </TagBox>
          <SubmitBtn onClick={handleSubmit} type="submit">
            공유
          </SubmitBtn>
        </BottomBox>
      </Container>
    </FixedContainer>
  );
};

export default CreatePostModal;

const Container = styled.div`
  width: 90%;
  /* height: 60vh; */
  background-color: white;
  border-radius: 20px;
  border: 3px solid ${COLORS.main};
  padding: 3% 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  * {
    font-family: "Hakgyoansim";
  }
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${COLORS.main};

  padding: 0 5% 2% 0;
  .createNote__title {
    font-size: 20px;
    font-weight: 600;
  }
  img {
    width: 50px;
    height: 50px;
  }
`;

const BottomBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 12px;
  align-items: center;
  justify-content: space-around;
  padding: 20px 30px;
`;

const ImgUploadWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  input[type="file"] {
    display: none;
  }
  .plus {
    display: block;
    width: 60px;
    height: 60px;
  }
`;

const PreviewLabel = styled.label`
  width: 50%;
  aspect-ratio: 3/4;
  .preview {
    display: block;
    width: 100%;
    border-radius: 10px;
  }
`;

const ImgUploadLabel = styled.label`
  width: 70%;
  aspect-ratio: 1/1;
  background-color: #efefef;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;
//-----------이미지 업로드------------

const TextBox = styled.div`
  width: 100%;
  height: 50px;
`;
const InputContent = styled.textarea`
  display: block;
  border: none;
  width: 100%;
  height: 100%;
  resize: none;
`;

const PosBox = styled.div`
  width: 100%;
  .pos {
    background-color: ${COLORS.background_green};
    border-radius: 50px;
    padding: 4px 10px;
    height: 25px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
  }
`;

const TagBox = styled.div`
  width: 100%;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;
const TagBtn = styled.button`
  width: 30%;
  border-radius: 50px;
  height: 30px;
  background-color: ${(props) =>
    props.$isClick ? `${COLORS.main}` : `${COLORS.background_green}`};
  font-size: 0.8rem;
  color: ${(props) =>
    props.$isClick ? `${COLORS.background_green}` : `${COLORS.main}`};
  font-size: 0.9rem;
  font-weight: 600;
`;
const Title = styled.span`
  display: inline-block;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const SubmitBtn = styled.button`
  display: block;
  width: 100%;
  height: 45px;
  border-radius: 60px;
  background-color: ${COLORS.main};
  color: ${COLORS.background_green};
`;
const DangerBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DangerBtn = styled.button`
  width: 30%;
  height: 30px;
  border-radius: 50px;
  background-color: ${(props) => {
    if (props.$isClick) {
      // 클릭된 경우 색상 설정
      switch (props.name) {
        case "저위험":
          return "#FFD700";
        case "중위험":
          return "#FFA500";
        case "고위험":
          return "#FF4500";
        default:
          return `${COLORS.main}`;
      }
    } else {
      switch (props.name) {
        case "저위험":
          return "#FFFACD";
        case "중위험":
          return "#FFE4B5";
        case "고위험":
          return "#FFC0CB";
        default:
          return `${COLORS.background_green}`; // 기본 색상
      }
    }
  }};
`;
