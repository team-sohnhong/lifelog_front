import {
  Button,
  ButtonGroup,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { defaultAnswer } from "domain/type/answerinterface";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "store";
import {
  defaultQuestion,
  QuestionProps,
} from "../domain/type/questionInteface";
import { apiRequest } from "../service";
import questionService from "./../service/question.service";
import { v4 as uuidv4 } from "uuid";

// 리덕스에 모든 질문 받아와 state에 저장-> useSelector를 이용해 store에서 개별 question 가져오기 -이게 맞는 거 같다.
// 가능한 props는 사용하지 말고, useState, useSelector만 이용해서 개발하자.

// 컴포넌트에서는 리덕스에서 데이터를 뿌려주는 dumb역할만 할 거고, 기능은 useState 제외하고는 redux reducer가 하게 할 것이다.

export default function Question() {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [question, setQuestion] = useState<QuestionProps>(defaultQuestion);
  const { id, category, title, content, created_at, owner } = question;

  let { adopted } = question;

  const oneQuestion = useSelector(
    (state: RootState) => state.question.questions
  );

  const getQuestion = async () => {
    const response = await apiRequest.get(`/questions/${params.id}`);
    const { data } = response;

    setQuestion(data);
    setLoading(false);
  };

  const deleteQuestion = async () => {
    questionService.deleteQuestion(params.id!);

    navigate("/");
  };

  const handleAdopted = () => {
    setQuestion({
      ...question, //부분 값 변경하려면 이렇게!! 전체 가져온 후
      adopted: !adopted, // 이렇게!
    });
  };

  const [answerTitle, setAnswerTitle] = useState("");
  const [answerBody, setAnswerBody] = useState("");

  const onAnswerTitleChange = (e: any) => {
    setAnswerTitle(e.target.value);
  };

  const onAnswerBodyChange = (e: any) => {
    setAnswerBody(e.target.value);
  };
  const userId = useSelector((state: RootState) => state.user.user._id);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let answer = {
      title: answerTitle,
      id: uuidv4(),
      body: answerBody,
      related: params.id!,
      adopted: false,
      owner: userId,
      created_at: Date.now(),
    };

    navigate("/");
  };

  useEffect(() => {
    getQuestion();
    // questionService.getQuestion(`${params.id}`);
  }, []);

  return (
    <div>
      {loading ? null : (
        <Container maxWidth="lg">
          <Box
            sx={{
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              borderLeft: 1,
              borderRight: 1,
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
            <Grid container justifyContent={"center"}>
              <Grid item xs={10}>
                <Typography sx={{ mt: 5, mb: 3 }} component="h3" variant="h3">
                  {title}
                </Typography>
                <Divider />
                <Typography sx={{ mt: 10 }} component="h6" variant="h6">
                  {content}
                </Typography>
                <Divider sx={{ mt: 30, mb: 3 }} />
                <Typography sx={{ my: 1 }}>
                  채택 여부: {adopted.toString()}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={() => {
                        handleAdopted();
                        console.log(adopted);
                      }}
                      value={adopted}
                      color="primary"
                    />
                  }
                  label="채택하기"
                />
                <Typography sx={{ my: 1 }}>만든 시간: {created_at}</Typography>
                <Typography sx={{ my: 1 }}>만든 사람: {owner}</Typography>
                <Typography sx={{ my: 1 }}>카테고리: {category}</Typography>
                <Typography sx={{ my: 1 }}>아이디: {id}</Typography>
                <Button onClick={deleteQuestion}>삭제하기</Button>
                <ButtonGroup
                  variant="contained"
                  color="secondary"
                  size="small"
                  aria-label="1"
                  sx={{ my: 3 }}
                >
                  <Button>Tag1</Button>
                  <Button>Tag2</Button>
                </ButtonGroup>
                <Divider />
                {[
                  "댓글1 : 좋은 글이네요",
                  "댓글2 : 배고파요",
                  "댓글3 : 감사합니다!!!",
                ].map((comment, index) => {
                  return (
                    <Typography key={index} sx={{ my: 1 }}>
                      {comment}
                    </Typography>
                  );
                })}
                <Divider />
                <h2>답변 작성하기</h2>
                <form onSubmit={handleSubmit}>
                  <TextField
                    name="answer"
                    value={answerTitle}
                    onChange={onAnswerTitleChange}
                    variant="standard"
                    placeholder="제목"
                    fullWidth
                    required
                    sx={{
                      mb: 3,
                    }}
                  />
                  <TextField
                    name="answer"
                    value={answerBody}
                    onChange={onAnswerBodyChange}
                    variant="outlined"
                    placeholder="답변"
                    multiline
                    required
                    minRows={10}
                    fullWidth
                    sx={{
                      mt: 3,
                      mb: 3,
                    }}
                  />
                  <Button type="submit" variant="contained" color="secondary">
                    답변 등록하기
                  </Button>
                </form>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </div>
  );
}
