import { Box, Container, CssBaseline } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
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
} //이거 삭제해야 겠다. 필요 없는 interface. Array<PostProps>나  PostProps[]로 충분

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

function Home() {
  const posts = useSelector(state => state) as PostProps[]

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
            <QuestionHeader posts={posts} />
            <QuestionList posts={posts} />
          </Box>
        </Container>
      </React.Fragment>
    </div>
  )
}

export default Home
