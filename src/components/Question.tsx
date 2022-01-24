import {
  Button, ButtonGroup, Container, Divider, Grid, TextField, Typography
} from "@mui/material"
import { Box } from "@mui/system"
import { QuestionProps } from "../type/questionInteface"
// import img from "./../assets/logo192.png"

export default function Question() {
  // { question }: { question: QuestionProps }
  // const dispatch = useDispatch() // 이것도 나중에 댓글 달 때나 쓰일 듯
  // const question: QuestionProps = useSelector(state => state) //이거 안 쓸 거야
  const question: QuestionProps = {
    date: "tomorrow",
    title: "It's a title!!",
    content: "It's a content!!",
    vote: 20,
    answer: 0,
    tags: ["tag1"],
    created_at: Date.now(),
    writer: "userName",
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          height: "100vh",
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
              {question.title}
            </Typography>
            <Divider />
            <Typography sx={{ mt: 10 }} component="h6" variant="h6">
              {question.content}
            </Typography>
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
              "댓글1 : 최웅 국연수 포에버",
              "댓글2 : 배고파요",
              "댓글3 : 안녕하세요 가르쳐주세요",
            ].map((item, index) => {
              return <Typography sx={{ my: 1 }}>{item}</Typography>
            })}
            <Divider />
            {/* <Box
              component="img"
              sx={{
                height: 50,
                width: 50,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="The house from the offer."
              src={"/logo192.png"}
            /> */}
            <TextField
              name="comment"
              variant="standard"
              placeholder="댓글"
              // required
              fullWidth
              sx={{
                my: 8,
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
