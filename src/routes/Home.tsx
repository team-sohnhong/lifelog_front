import { Box, Button, Container, CssBaseline } from "@mui/material"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
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

export let posts: Posts = {
  posts: [post, post, post, post, post], //post의 개수 만큼 리스트 생성
}

function Home() {
  const 꺼내온거 = useSelector(state => state) as PostProps[]
  const dispatch = useDispatch()
  // let [postss, setPostss] = useState<Posts>(posts)
  // const change = () => {
  // setPostss(posts)
  // }
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
            {/* <p>{꺼내온거}</p> */}
            <Button onClick={() => dispatch({ type: "증가" })}>증가</Button>
            <QuestionHeader posts={꺼내온거} />
            <QuestionList posts={꺼내온거} />
          </Box>
        </Container>
      </React.Fragment>
    </div>
  )
}

export default Home
