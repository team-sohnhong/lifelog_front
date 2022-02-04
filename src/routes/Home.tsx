import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionHeader from "../components/QuestionHeader";
import Questions from "../components/Questions";
import { RootState } from "../store";
import { getAllQuestions } from "../store/question.slice";

// 질문들을 받아서 redux store에 받는 것이 목표
// 새로고침하면 새로 받는 것이 원래의 목표아닌가 ?
// redux store에 없으면 api call을 부르는 게 맞지 않나 생각한다.
function Home() {
  const dispatch = useDispatch();

  const { loading, questions, error } = useSelector(
    (state: RootState) => state.question
  );

  useEffect(() => {
    dispatch(getAllQuestions());
    console.log("🚀 리덕스 스토어 내의 questions", questions);
  }, []);

  return (
    <React.Fragment>
      <Container fixed>
        <Box
          sx={{
            minHeight: "150vh",
          }}
        >
          <QuestionHeader questions={questions} />
          <Questions questions={questions} />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Home;
