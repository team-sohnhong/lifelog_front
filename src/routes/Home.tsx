import { Box, Container, CssBaseline } from "@mui/material";
import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import QuestionHeader from "../components/QuestionHeader";
import Questions from "../components/Questions";
import { defaultQuestion, QuestionProps } from "../domain/type/questionInteface";
import MetaMaskAuth from "../components/auth/Metamask";
import { apiRequest } from "../service/axios";

function Home() {
  const [loading, setLoading] = useState(true); //이거 안넣어도 왜 에러가 안나지

  const [questions, setQuestions] = useState<QuestionProps[]>([
    defaultQuestion,
  ]);

  const getQuestions = async () => {
    const response = await apiRequest.get(`/questions`);
    const { data } = response;
    console.log("🚀 ~ file: Home.tsx ~ line 16 ~ getQuestions ~ data", data);

    setQuestions(data);
    setLoading(false);
  };

  useEffect(() => {
    getQuestions();
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
