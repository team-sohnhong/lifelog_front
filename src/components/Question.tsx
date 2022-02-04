import { Button, Container, Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AnswerWrite from "components/AnswerWrite";
import { Answer, defaultAnswer } from "domain/type/answerInterface";
import useQuestion from "hooks/QuestionHooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "store";
import { defaultQuestion } from "../domain/type/questionInteface";
import answerService from "./../service/answer.service";
import questionService from "./../service/question.service";
import { ethers } from "ethers";
import abi from "../utils/CritPortal.json";
import { address } from "../utils/ContractInfo";

declare var window: any;

export default function Question() {
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(true);
  const { question, setQuestion } = useQuestion(defaultQuestion, params.id!); 
  const [answers, setAnswers] = useState<Answer[]>([
    defaultAnswer,
    defaultAnswer,
    defaultAnswer,
  ]);
  const { id, category, title, content, created_at, owner } = question;
  let { closed } = question;

  const userAddress = useSelector((state: RootState) => state.user.user.address); 
  console.log("🚀 userAddress : ", userAddress);

  const getAnswers = async () => {
    const answersRes = await answerService.getAnswers(params.id!);
    setAnswers(answersRes);
  };

  const handleCloseQuestion = async () => {
    const closedQuestion = await questionService
      .closeQuestion(params.id!)
      .then((closedQuestion) => {
        console.log(closedQuestion);
        setQuestion(closedQuestion);
      });
  };

  const handleChooseAnswer = async (answerId: string) => {
    const chosenAnswer: Answer = await answerService.chooseAnswer(answerId);
    setAnswers(
      answers.map((answer) => (answer.id === answerId ? chosenAnswer : answer))
    );
  };
  
  const contractAddress = address;
  const contractABI = abi.abi;
  const closeQuestion = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const critPortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        let before = await critPortalContract.getQuestionById(question.id);

        let result = await critPortalContract.closeQuestion(question.id);

        let after = await critPortalContract.getQuestionById(question.id);

        console.log(before, after);
        return true;
      } else {
        console.log("Ethereum object doesn't exist!");
        return false;
      }
    } catch (error) {
      console.log(error);
    }
    // 서버에서 isClosed 로직 넣기

    navigate("/");
  };

  useEffect(() => {
    console.log(owner, closed, "랜더링됨");
    // getQuestion();
    getAnswers().then(() => setLoading(false));
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  {closed && (
                    <Typography color={"secondary"} component="h6" variant="h6">
                      this question is closed
                    </Typography>
                  )}{" "}
                  {owner === userAddress && !closed && (
                    <Button
                      variant="contained"
                      color={"secondary"}
                      onClick={() => handleCloseQuestion()}
                    >
                      close this question
                    </Button>
                  )}
                </Box>

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
                        closed: {closed.toString()}
                      </Typography>

                      <Typography gutterBottom>creator: {owner}</Typography>
                      <Typography gutterBottom>
                        created_at: {created_at}
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
                          <Grid item container justifyContent={"flex-end"}>
                            {answer.adopted && (
                              <Typography
                                color={"secondary"}
                                component="h6"
                                variant="h6"
                              >
                                Adopted
                              </Typography>
                            )}
                            {owner === userAddress &&
                              !closed &&
                              !answer.adopted && (
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={() => handleChooseAnswer(answer.id)}
                                >
                                  adapt this
                                </Button>
                              )}
                          </Grid>
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
                              adopted : {answer.adopted.toString()}
                            </Typography>
                            {/* <Typography gutterBottom> */}
                            {/* answerId : {answer.id} */}
                            {/* </Typography> */}
                            <Typography gutterBottom>
                              created_at : {answer.created_at}
                            </Typography>
                            <Typography gutterBottom>
                              answerer : {answer.owner}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                    );
                  })}
                </Box>
                <AnswerWrite userAddress={userAddress}></AnswerWrite>
              </Grid>
            </Grid>
          </Box>
        </Container>
      )}
    </div>
  );
}
