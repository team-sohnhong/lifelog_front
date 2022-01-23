import { Box, Container, CssBaseline } from "@mui/material"
import React from "react"
import AppBar from "../components/AppBar"
import QuestionHeader from "../components/QuestionHeader"
import QuestionList from "../components/QuestionList"

interface User {
  id: string
  user_name: string
  address: string
  image: string
}

export interface PostProps {
  date: string
  title: string
  content: string
  vote: number
  answer: number
  tags: Array<string>
  created_at: number
  writer: string
}

export interface Posts {
  posts: Array<PostProps>
}

function Home() {
  const post: PostProps = {
    date: "today",
    title: "title",
    content: "content",
    vote: 2,
    answer: 0,
    tags: ["tag1"],
    created_at: Date.now(),
    writer: "userName",
  }

  const posts: Posts = {
    posts: [post, post, post, post, post], //post의 개수 만큼 리스트 생성
  }

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
            <QuestionHeader posts={posts.posts} />
            <QuestionList posts={posts.posts} />
          </Box>
        </Container>
      </React.Fragment>
    </div>
  )
}

export default Home
