import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { defaultQuestion, QuestionProps } from "../type/questionInteface"

export default function Question() {
  const [loading, setLoading] = useState(true)

  const [questions, setQuestions] = useState<QuestionProps[]>([defaultQuestion])
  const question: QuestionProps = questions[0]
  const { _id, category, title, content, adopted, created_at } = question

  const getQuestions = async () => {
    const json = await (await fetch(`http://localhost:3000/questions`)).json()
    console.log(json[0])
    setQuestions(json)
    setLoading(false)
  }

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <div>
      {loading ? null : (
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
                  {title}
                </Typography>
                <Divider />
                <Typography sx={{ mt: 10 }} component="h6" variant="h6">
                  {content}
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
                <Typography sx={{ my: 1 }}>
                  채택 여부: {adopted.toString()}
                </Typography>
                <Typography sx={{ my: 1 }}>만든 시간: {created_at}</Typography>
                <Typography sx={{ my: 1 }}>카테고리: {category}</Typography>
                <Typography sx={{ my: 1 }}>아이디: {_id}</Typography>
                <Divider />
                {[
                  "댓글1 : 좋은 글이네요",
                  "댓글2 : 배고파요",
                  "댓글3 : 감사합니다!!!",
                ].map((item, index) => {
                  return (
                    <Typography key={index} sx={{ my: 1 }}>
                      {item}
                    </Typography>
                  )
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
      )}
    </div>
  )
}
