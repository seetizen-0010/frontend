import React, { useState, useEffect } from "react";

import PhotoItem from "./PhotoItem.js";
import CommentSection from "./CommentSection.js";
import TagList from "./TagList.js";
import {
    BoardlistContainer,
    BoardItem,
    Actions,
    ReportButton,
    CivilButton,
    UsefulButton,
} from "../styles/BoardListStyles";

const Boardlist = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Replace with actual backend API call
        fetch("http://localhost:3000")
            .then((response) => response.json())
            .then((fetchedData) => setData(fetchedData))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <BoardlistContainer>
            {data.map((item) => (
                <BoardItem key={item.id}>
                    <PhotoItem photo={item.photo} location={item.location} />
                    <Actions>
                        <ReportButton onClick={() => alert('신고되었습니다!')}>신고</ReportButton>
                        <CivilButton onClick={() => window.open(item.civilLink, '_blank')}>민원 연결</CivilButton>
                    </Actions>
                    <TagList tags={item.tags} />
                    <CommentSection comments={item.comments} />
                    <UsefulButton onClick={() => alert('유용해요!')}>유용해요</UsefulButton>
                </BoardItem>
            ))}
        </BoardlistContainer>
    );
};

export default Boardlist;