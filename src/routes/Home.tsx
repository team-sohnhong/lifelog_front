import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionHeader from "../components/QuestionHeader";
import Questions from "../components/Questions";
import { RootState } from "../store";
import { getAllQuestions } from "../store/question.slice";


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
