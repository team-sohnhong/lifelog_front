import {
  Alert,
  Button,
  Container,
  Grid,
  Link,
  Snackbar,
  SnackbarOrigin,
  TextField,
} from "@mui/material"
import { Box } from "@mui/system"
import { useState } from "react"
import { PostProps } from "./../routes/Home"

export default function AddQuestion(props: any) {
  // let [title, setTitle] = useState("")
  // let [content, setContent] = useState("")

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  })
  const { vertical, horizontal, open } = state

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ open: true, ...newState })
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // console.log("🚀 ~ file: SignIn.tsx ~ line 50 ~ handleSubmit ~ data", event)

    console.log({
      date: "1",
      title: data.get("title"),
      content: data.get("content"),
      vote: 0,
      answer: 0,
      tags: [],
      created_at: Date.now(),
      writer: "me",
    })
  }

  const post: PostProps = {
    date: "today",
    title: "title",
    content: "content",
    vote: 2,
    answer: 0,
    tags: ["tag1"],
    created_at: Date.now(),
    writer: "me",
  }

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          // marginTop: 8,
          display: "flex",
          flexDirection: "column",
          borderLeft: 1,
          borderRight: 1,
          borderColor: "#888888",

          // justifyContent: "flex-start",
          alignItems: "center",
          // alignContent: "center",
          "& input": {
            fontSize: "22px",
          },
          "& input::placeholder": {
            //이렇게 각 속성에 넣을 수도 있고
            fontSize: "22px",
            color: "blue",
          },
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent={"flex-end"}
          sx={{
            marginTop: 8,
          }}
        >
          <Grid item mr={1}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleClick({
                vertical: "top",
                horizontal: "center",
              })}
            >
              임시 저장
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={800}
              open={open}
              onClose={handleClose}
              // message="임시 저장 실패"
              key={vertical + horizontal}
            >
              <Alert severity="error">임시 저장 실패!</Alert>
            </Snackbar>
          </Grid>
          <Grid item xs={2}>
            {/* <Link href="/addQuestion" underline="none"> */}
            <Button type="submit" color="secondary" variant="contained">
              저장
            </Button>
            {/* </Link> */}
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"}>
          <Grid item xs={10}>
            <Box sx={{ mt: 3, alignItems: "center" }}>
              <TextField
                name="title" //이게 값 연결
                variant="standard"
                placeholder="제목"
                // size="large"
                required
                fullWidth
                sx={{
                  my: 8,
                }}
              />

              <TextField
                name="content"
                variant="standard"
                placeholder="내용을 입력하세요"
                multiline // 멀티라인하면 fontSize가 안바뀌구나
                fullWidth
                minRows={34} //이게 중요
                maxRows={50}
                InputProps={{ disableUnderline: true, margin: "dense" }}
                sx={{
                  pt: 1,
                  pl: 0,
                  // border: 1,
                  borderColor: "#808080",
                  minHeight: 800,
                }}
              ></TextField>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
