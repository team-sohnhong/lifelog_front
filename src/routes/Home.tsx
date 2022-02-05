import { Box, Container } from "@mui/material";
import Questions from "components/question/Questions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionHeader from "../components/question/QuestionHeader";
import { RootState } from "../stores";
import { getAllQuestions } from "../stores/question.slice";

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
      {loading ? null : error ? null : (
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
      )}
    </React.Fragment>
  );
}

export default Home;
