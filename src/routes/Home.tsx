import { Box, Container, CssBaseline } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import AppBar from "../components/AppBar"
import QuestionHeader from "../components/QuestionHeader"
import Questions from "../components/Questions"
import { QuestionProps } from "../type/questionInteface"

function Home() {
  const questions = useSelector(state => state) as QuestionProps[]

  return (
    <div>
      <AppBar />
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <Box
            sx={{
              height: "150vh",
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
