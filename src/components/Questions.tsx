import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Link,
  List,
  Typography,
} from "@mui/material"
import { Link as RouterLink } from "react-router-dom"

import { useEffect, useState } from "react"
import { QuestionProps } from "../type/questionInteface"

const Questions = ({ questions }: { questions: QuestionProps[] }) => {
  // const { posts } = props.posts

  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([""])

  const getMovies = async () => {
    // const response = await fetch(
    //   `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`
    // )
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year`
      )
    ).json()
    // const json = await response
    setMovies(json.data.movies)
    setLoading(false)
  }

  useEffect(() => {
    getMovies()
  }, [])
  console.log(movies)
  return (
    <List>
      {questions
        .map((item, index) => {
          return (
            <Card
              key={index}
              sx={{ minWidth: 275, mb: 1, backgroundColor: "#1E1E1E" }}
            >
              <Grid
                container
                direction="row"
                // justify="center"
                // alignItems="center"
                alignContent="center"
              >
                {/* views and answers */}
                <Grid item xs={1}>
                  <Box
                    sx={{
                      my: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      color: "#616161",
                    }}
                    component="div"
                  >
                    <Typography variant="h6" gutterBottom>
                      {item.vote}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      vote
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {item.answer}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      answer
                    </Typography>
                  </Box>
                </Grid>
                {/* content-body */}
                <Grid item xs={11} mx={"auto"}>
                  <CardContent>
                    <Link component={RouterLink} to="/question/detail" underline="none">
                      <Typography
                        sx={{ fontSize: 20, color: "#BB86FC" }}
                        gutterBottom
                      >
                        {item.title}
                      </Typography>
                    </Link>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="#D8D8D8"
                      gutterBottom
                    >
                      {item.content}
                      {/* I'm currently trying to make a quote system for my forum and
                    since I am using bb-codes throughout the whole system I want
                    to implement this for quoting aswell. I have created what I
                    want the quote tag ... */}
                    </Typography>
                  </CardContent>
                  {/* tags and writer */}
                  <CardActions sx={{ fontSize: 15 }}>
                    <Grid
                      container
                      spacing={0}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      alignContent="center"
                      wrap="nowrap"
                    >
                      <Grid item xs={1}>
                        <Button size="small">#{item.tags[0]}</Button>
                      </Grid>
                      <Grid item mr={5}>
                        <Typography color="#616161">
                          {item.created_at}
                        </Typography>
                        <AccessibilityNewIcon></AccessibilityNewIcon>
                        <Link href="/user" underline="none">
                          <Typography color="#BB86FC">{item.writer}</Typography>
                        </Link>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Grid>
              </Grid>

              <Divider />
            </Card>
          )
        })
        .reverse()}
    </List>
  )
}

export default Questions
