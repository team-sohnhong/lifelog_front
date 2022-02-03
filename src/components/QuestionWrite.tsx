import {
  Alert,
  Button,
  Container,
  Grid,
  Snackbar,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";
import { v4 as uuidv4 } from "uuid";
import { apiRequest } from "../service";

export default function WriteQuestion(props: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 임시저장 로직
  const [snackbar, setSnackbar] = useState({
    open: false,
  });

  const { open } = snackbar;

  const handleSnackbaropen = () => {
    setSnackbar({ open: !open });
  };

  const postQuestion = async (question: any) => {
    try {
      const response = await apiRequest.post(`/questions`, question);
    } catch (err) {
      console.error(
        "🚀 ~ file: QuestionWrite.tsx ~ line 36 ~ postQuestion ~ response",
        err
      );
    }
  };

  const userId = useSelector((state: RootState) => state.user.user._id);

  // 전송 및 라우트 이동 로직
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    let question = {
      id: uuidv4(),
      title: data.get("title") as string, //textfield의 name 으로 정해놓은 걸 가져올 수 있음! value, onchage와는 다른 방식
      content: data.get("content") as string,
      owner: userId,
      reward: 0.01,
    };
    console.log(
      "🚀 ~ file: QuestionWrite.tsx ~ line 58 ~ handleSubmit ~ question",
      question
    );

    postQuestion(question);

    // 리덕스 스토어에 증가 액션 요청 with 데이터
    dispatch({ type: "증가", payload: question });

    console.log(
      "🚀 ~ file: AddQuestion.tsx ~ line 48 ~ handleSubmit ~ post",
      question
    );
    navigate("/");
  };

  return (
    <Container maxWidth="md">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          my: 5,
          border: 1,
          borderColor: "#888888",
          alignItems: "center",
          "& input": {
            fontSize: "22px",
          },
          "& input::placeholder": {
            //이렇게 컴포넌트의 각 속성에도 넣을 수도 있다
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
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleSnackbaropen}
            >
              Save Temporarily
            </Button>
            <Snackbar
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              autoHideDuration={800}
              open={open}
              onClose={handleSnackbaropen}
              key={"temporary-storage-top"}
            >
              <Alert severity="error">
                Failed to save your file temporarily!
              </Alert>
            </Snackbar>
          </Grid>
          <Grid item xs={2}>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              // disabled
            >
              Post
            </Button>
          </Grid>
        </Grid>

        <Grid container justifyContent={"center"}>
          <Grid item xs={10}>
            <Box sx={{ mt: 3, alignItems: "center" }}>
              <TextField
                name="title" //이게 값 연결
                variant="standard"
                placeholder="Title"
                required
                fullWidth
                sx={{
                  my: 8,
                }}
              />

              <TextField
                name="content"
                variant="standard"
                placeholder="Write your question..."
                multiline // 멀티라인하면 fontSize가 안바뀌구나
                fullWidth
                required
                minRows={16} //이게 중요
                maxRows={16}
                InputProps={{ disableUnderline: true }}
                sx={{
                  pt: 1,
                  pl: 0,
                  borderColor: "#808080",
                  minHeight: 400,
                }}
              ></TextField>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <p>YOUR QUESTION REWARD</p>
        <TextField
          id=""
          placeholder="eth"
          // value={}
          // onChange={}
        />{" "}
        eth
      </Box>
    </Container>
  );
}
