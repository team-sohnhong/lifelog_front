import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material"
import { Box } from "@mui/system"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { defaultQuestion, QuestionProps } from "../type/questionInteface"

export default function Question() {
  const params = useParams()

  const [loading, setLoading] = useState(true)

  const [question, setQuestion] = useState<QuestionProps>(defaultQuestion)
  const { id, category, title, content, created_at, owner } = question
  let { adopted } = question

  //axios로 변경 예정
  const getQuestion = async () => {
    const json = await (
      await fetch(`http://localhost:3000/questions/${params.id}`)
    ).json()
    setQuestion(json)
    setLoading(false)
  }

  const clickAdopted = () => {
    setQuestion({
      ...question, //부분 값 변경하려면 이렇게!! 전체 가져온 후
      adopted: !adopted, // 이렇게!
    })
  }
  useEffect(() => {
    getQuestion()
  }, [])

  return (
    <div>
      {loading ? null : (
        <Container maxWidth="md">
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
                        clickAdopted()
                        console.log(adopted)
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
                  )
                })}
                <Divider />
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
