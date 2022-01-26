import { Box, Container, CssBaseline } from "@mui/material"
import React, { useEffect, useState } from "react"
import { apiRequest } from "../api/api"
import QuestionHeader from "../components/QuestionHeader"
import Questions from "../components/Questions"
import { defaultQuestion, QuestionProps } from "../type/questionInteface"

function Home() {
  const [loading, setLoading] = useState(true)

  const [questions, setQuestions] = useState<QuestionProps[]>([defaultQuestion])

  const getQuestions = async () => {
    const response = await apiRequest.get(`/questions`)
    const { data } = response
    console.log("🚀 ~ file: Home.tsx ~ line 16 ~ getQuestions ~ data", data)

    setQuestions(data)
    setLoading(false)
  }

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
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
  )
}

export default Home
