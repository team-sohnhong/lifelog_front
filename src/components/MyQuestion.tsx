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
import { Answer, defaultAnswer } from "domain/type/answerinterface";
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
import answerService from "./../service/answer.service";


// 1. 답변 달기 없음
// 2. 답변 종류와 채택하기 만 존재
export default function MyQuestion() {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<QuestionProps>(defaultQuestion);
  const [answers, setAnswers] = useState<Answer[]>([defaultAnswer]);
  const [answerTitle, setAnswerTitle] = useState("");
  const [answerContent, setAnswerContent] = useState("");

  const { id, category, title, content, created_at, owner } = question;
  let { closed } = question;

  const oneQuestion = useSelector(
    (state: RootState) => state.question.questions
  );

  const handleClosed = () => {
    setQuestion({
      ...question, //부분 값 변경하려면 이렇게!! 전체 가져온 후
      closed: !closed, // 이렇게!
    });
  };

  const onAnswerTitleChange = (e: any) => {
    setAnswerTitle(e.target.value);
  };

  const onAnswerBodyChange = (e: any) => {
    setAnswerContent(e.target.value);
  };

  // 질문 등록 시 owner 용, 에러가 있어서 나중에 선언할 것. local Storage 한 후
  // const userAddress = useSelector((state: RootState) => state.user.user.address);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let answer = {
      title: answerTitle,
      id: uuidv4(),
      content: answerContent,
      related: params.id!,
      owner: "",
    };

    answerService.postAnswer(answer).then((data: any) => {
      data ? navigate("/") : console.log("ERROR");
    });
  };

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
  const getAnswers = async () => {
    const answers = await answerService.getAnswers(params.id!);
    setAnswers(answers);
  };

  useEffect(() => {
    getQuestion();
    // getAnswers();
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
                  채택 여부: {closed.toString()}
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      onClick={() => {
                        handleClosed();
                        console.log(closed);
                      }}
                      value={closed}
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

                <h2>답변 목록</h2>
                {answers.map((answer, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        height: "100px",
                        color: "success.dark",
                        display: "flex",
                        flexDirection: "column",
                        my: 10,
                      }}
                    >
                      <Typography sx={{ my: 1 }}>{answer.title}</Typography>
                      <Typography sx={{ my: 1 }}>{answer.content}</Typography>
                      <Typography sx={{ my: 1 }}>{answer.id}</Typography>
                      <Typography sx={{ my: 1 }}>
                        answered {answer.created_at}
                      </Typography>
                      <Typography sx={{ my: 1 }}>{answer.owner}</Typography>
                    </Box>
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
                    value={answerContent}
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
