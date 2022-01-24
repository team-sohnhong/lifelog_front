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
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom"
import { PostProps } from "./../routes/Home"
import { useNavigate } from "react-router-dom"

export default function AddQuestion(props: any) {
  const 꺼내온거 = useSelector(state => state)
  const dispatch = useDispatch()

  const [snackbar, setSnackbar] = useState({
    open: false,
  })
  const { open } = snackbar

  const handleClick = () => {
    setSnackbar({ open: !open })
  }
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // console.log("🚀 ~ file: SignIn.tsx ~ line 50 ~ handleSubmit ~ data", event)
    let post: PostProps = {
      date: "오늘",
      title: data.get("title") as string,
      content: data.get("content") as string,
      vote: 3,
      answer: 0,
      tags: ["태그"],
      created_at: Date.now(),
      writer: "Me",
    }
    dispatch({ type: "증가", payload: post })

    console.log(
      "🚀 ~ file: AddQuestion.tsx ~ line 48 ~ handleSubmit ~ post",
      post
    )

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
    navigate("/")
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
            <Button color="secondary" variant="outlined" onClick={handleClick}>
              임시 저장
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={800}
              open={open}
              onClose={handleClick}
              key={"temporary-storage-top"}
            >
              <Alert severity="error">임시 저장 실패!</Alert>
            </Snackbar>
          </Grid>
          <Grid item xs={2}>
            {/* <Link component={RouterLink} to="/" underline="none"> */}
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
