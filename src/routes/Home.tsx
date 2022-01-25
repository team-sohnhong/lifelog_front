import { Box, Container, CssBaseline } from "@mui/material"
import React, { useEffect, useState } from "react"
import AppBar from "../components/AppBar"
import QuestionHeader from "../components/QuestionHeader"
import Questions from "../components/Questions"
import { defaultQuestion, QuestionProps } from "../type/questionInteface"

function Home() {
  // const questions = useSelector(state => state) as QuestionProps[]
  const [loading, setLoading] = useState(true) //loading 안 써도 에러가 안난다.

  const [questions, setQuestions] = useState<QuestionProps[]>([defaultQuestion])

  const getQuestions = async () => {
    const json = await (
      await fetch(`http://localhost:3000/questions`, { method: "GET" })
    ).json()
    console.log(json)
    setQuestions(json)
    setLoading(false)
  }

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <div>
      <AppBar />
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
    </div>
  )
}

export default Home
