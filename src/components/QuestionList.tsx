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
  List, Typography
} from "@mui/material"
import { Posts } from "../routes/Home"

const QuestionList: React.FC<Posts> = props => {
  const { posts } = props
  const post = posts[0]

  return (
    <List>
      {posts.map((item, index) => {
        return (
          <Card key={index} sx={{ minWidth: 275, mb: 1 }}>
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
                  }}
                  component="div"
                >
                  <Typography variant="h6" gutterBottom>
                    {post.vote}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    vote
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {post.answer}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    answer
                  </Typography>
                </Box>
              </Grid>
              {/* content-body */}
              <Grid item xs={11} mx={"auto"}>
                <CardContent>
                  <Link href="/post" underline="none">
                    <Typography sx={{ fontSize: 20 }} gutterBottom>
                      {item.title}
                    </Typography>
                  </Link>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
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
                      <Button size="small">#{post.tags[0]}</Button>
                    </Grid>
                    <Grid item mr={5}>
                      <Typography>{post.created_at}</Typography>
                      <AccessibilityNewIcon></AccessibilityNewIcon>
                      <Link href="/user" underline="none">
                        <Typography>{post.writer}</Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </CardActions>
              </Grid>
            </Grid>

            <Divider />
          </Card>
        )
      }).reverse()}
    </List>
  )
}

export default QuestionList

// 1. props 전달하는 것 만들기
// 2. 비동기 통신 만들기
// 3.
