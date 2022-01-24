import { Box, Button, Divider, Grid, Link, Typography } from "@mui/material"
import {
  Link as RouterLink
} from "react-router-dom"
import { Posts } from "../routes/Home"
export default function QuestionHeader({ posts }: Posts) {
  const postsLength = posts.length
  return (
    <Box>
      <Grid
        container
        spacing={0}
        px={2}
        pt={2}
        justifyContent={"space-between"}
      >
        <Typography variant="h4" color="initial">
          All Question
        </Typography>
        <Link component={RouterLink} to="/addQuestion" underline="none">
          <Button variant="contained" color="primary">
            Add Questions
          </Button>
        </Link>
      </Grid>
      <Box sx={{ mt: 5 }}>
        <Typography px={2}>{postsLength} questions</Typography>
        <Divider />
      </Box>
    </Box>
  )
}
