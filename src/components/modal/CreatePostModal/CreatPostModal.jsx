import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../../theme";
import { FixedContainer, DeleteBox } from "../Modal.styles";

import { useCreatePostStore } from "../../../store/modal/useModalStore";

const CreatePostModal = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const { toggleCreatePostModal } = useCreatePostStore();
  const tags = ["생활 안전", "교통 안전", "화재 안전", "재난 안전", "공사중"];

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result); // base64로 이미지를 미리보기
      };
      reader.readAsDataURL(file);
      setImageFile(file); // 파일 상태에 이미지 파일 저장
    }
  };

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
          <InputContent placeholder="상황을 설명해 주세요" />
          <PosBox>
            <Title>위치</Title>
            <div>사진의 위치가 표시 됩니다.</div>
          </PosBox>
          <TagBox>
            <Title>태그 추가</Title>
            <Tags>
              {tags.map((tag) => (
                <button key={tag}>{tag}</button>
              ))}
            </Tags>
          </TagBox>
          <SubmitBtn type="submit">공유</SubmitBtn>
        </BottomBox>
      </Container>
    </FixedContainer>
  );
};

export default CreatePostModal;

const Container = styled.div`
  width: 80%;
  height: 60vh;
  background-color: white;
  border-radius: 20px;
  border: 3px solid ${COLORS.main};
  padding: 5% 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const TopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${COLORS.main};
  padding: 0 5% 3% 0;
  height: 10%; /* 고정 높이 */
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
  flex-grow: 1;
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
    width: 50px;
    height: 50px;
  }
`;

const PreviewLabel = styled.label`
  width: 50%;
  aspect-ratio: 3/4;
  .preview {
    display: block;
    width: 100%;
    height: 100%;
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

const InputContent = styled.textarea`
  display: block;
  border: none;
  width: 100%;
  height: auto;
  min-height: 50px;
  max-height: 150px;
  resize: none;
`;

const PosBox = styled.div`
  width: 100%;
  div {
    background-color: ${COLORS.background_green};
    border-radius: 50px;
    padding: 4px 7px;
    font-size: 0.8rem;
  }
`;

const TagBox = styled.div`
  width: 100%;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  button {
    width: 30%;
    border-radius: 50px;
    height: 30px;
    background-color: ${COLORS.background_green};
    font-size: 0.8rem;
    color: ${COLORS.main};
  }
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 100px;
  border-radius: 60px;
  background-color: ${COLORS.main};
  color: white;
  /* font-size: ; */
`;
const Title = styled.span`
  display: inline-block;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
`;
