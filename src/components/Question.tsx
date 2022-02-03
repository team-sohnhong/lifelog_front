import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import AnswerWrite from "components/AnswerWrite";
import { Answer, defaultAnswer } from "domain/type/answerInterface";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "store";
import {
  defaultQuestion,
  QuestionProps,
} from "../domain/type/questionInteface";
import { apiRequest } from "../service";
import answerService from "./../service/answer.service";
import questionService from "./../service/question.service";

export default function Question() {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState<QuestionProps>(defaultQuestion);
  const [answers, setAnswers] = useState<Answer[]>([
    defaultAnswer,
    defaultAnswer,
    defaultAnswer,
  ]);

  const { id, category, title, content, created_at, owner } = question;
  let { closed } = question;

  // 공통
  const getQuestion = async () => {
    const response = await apiRequest.get(`/questions/${params.id}`);
    const { data } = response;

    setQuestion(data);
  };

  const getAnswers = async () => {
    const answers = await answerService.getAnswers(params.id!);
    setAnswers(answers);
  };

  // 질문 등록 시 owner 용, 에러가 있어서 나중에 선언할 것. local Storage 한 후
  const userId = useSelector((state: RootState) => state.user.user._id);
  console.log("🚀 출력 userId", userId);

  // MY_QUESTION logic
  const deleteQuestion = async () => {
    questionService.deleteQuestion(params.id!);

    navigate("/");
  };

  const handleClosed = async () => {
    const updatedQuestion = await questionService.closeQuestion(
      params.id!,
      !closed
    );
    setQuestion(updatedQuestion);
  };

  useEffect(() => {
    getQuestion();
    getAnswers();
    setLoading(false);

    // questionService.getQuestion(`${params.id}`);
  }, []);
  console.log(owner, closed, "랜더링됨");

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
              py: 10,

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
                {owner === userId && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={closed}
                          onChange={() => {
                            handleClosed();
                          }}
                          color="primary"
                        />
                      }
                      label="질문닫기"
                    />
                    <Button
                      variant="contained"
                      color={"secondary"}
                      onClick={deleteQuestion}
                    >
                      삭제하기
                    </Button>
                  </Box>
                )}
                <Box sx={{ height: "400px" }}>
                  <Typography sx={{ mt: 5, mb: 3 }} component="h3" variant="h3">
                    {title}
                  </Typography>
                  <Divider />
                  <Typography sx={{ mt: 10 }} component="h6" variant="h6">
                    {content}
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Grid container direction="column" alignItems={"flex-end"}>
                    <Grid item>
                      <Typography gutterBottom>
                        질문 닫기: {closed.toString()}
                      </Typography>

                      <Typography gutterBottom>만든 사람: {owner}</Typography>
                      <Typography gutterBottom>
                        만든 시간: {created_at}
                      </Typography>
                      {/* <Typography gutterBottom>카테고리: {category}</Typography> */}

                      {/* <ButtonGroup
                        variant="contained"
                        color="secondary"
                        size="small"
                        aria-label="1"
                        sx={{ my: 3 }}
                      >
                        <Button>Tag1</Button>
                        <Button>Tag2</Button>
                      </ButtonGroup> */}
                    </Grid>
                  </Grid>
                </Box>
                <Divider />
                <Box>
                  <h2>{answers.length} Answers</h2>
                  {answers.map((answer, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          // color: "success.dark",
                          display: "flex",
                          flexDirection: "column",
                          mt: 3,
                          mb: 10,
                          pb: 5,

                          borderBottom: 1,
                        }}
                      >
                        <Grid
                          container
                          direction="column"
                          // justifyContent={"flex-end"}
                          // alignItems={"flex-end"}
                          spacing={2}
                        >
                          {owner === userId && (
                            <Grid item container justifyContent={"flex-end"}>
                              <Button variant="contained" color="secondary">
                                채택하기
                              </Button>
                            </Grid>
                          )}
                          <Grid item sx={{ height: "200px" }}>
                            <Typography
                              variant="h5"
                              sx={{ pb: 3 }}
                              gutterBottom
                            >
                              {answer.title}
                            </Typography>
                            <Typography sx={{ my: 1 }}>
                              {answer.content}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            container
                            direction="column"
                            justifyContent={"flex-end"}
                            alignContent={"flex-end"}
                          >
                            <Typography gutterBottom>
                              채택여부 : {answer.adopted.toString()}
                            </Typography>
                            <Typography gutterBottom>
                              답변자 : {answer.id}
                            </Typography>
                            <Typography gutterBottom>
                              작성 시간 : {answer.created_at}
                            </Typography>
                            <Typography gutterBottom>
                              작성자 : {answer.owner}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    );
                  })}
                </Box>
                {/* 남의 질문이면서, 질문이 닫히지 않았다면, */}
                {owner !== userId && !question.closed && (
                  <AnswerWrite userId={userId}></AnswerWrite>
                )}
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </div>
  );
}
