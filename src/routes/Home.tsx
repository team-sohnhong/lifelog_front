import { Box, Container, CssBaseline } from "@mui/material"
import React from "react"
import AppBar from "../components/AppBar"
import QuestionHeader from "../components/QuestionHeader"
import QuestionList from "../components/QuestionList"

interface PostProps {
  post: {
    date: string
    title: string
    content: string
    vote: number
    answer: number
    tags: Array<string>
    created_at: Date
    writer: User
  }
}

interface User {
  id: string
  user_name: string
  address: string
  image: string
}

function Home() {
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
            <QuestionHeader />
            <QuestionList />
          </Box>
        </Container>
      </React.Fragment>
    </div>
  )
}

export default Home
