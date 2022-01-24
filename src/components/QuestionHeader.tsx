import { Box, Button, Divider, Grid, Link, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { QuestionProps } from "./../type/questionInteface"
export default function QuestionHeader({
  questions,
}: {
  questions: QuestionProps[]
}) {
  const questionsLength = questions.length
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
          All Questions
        </Typography>
        <Link component={RouterLink} to="/question" underline="none">
          <Button variant="contained" color="primary">
            Add Question
          </Button>
        </Link>
      </Grid>
      <Box sx={{ mt: 5 }}>
        <Typography px={2}>{questionsLength} questions</Typography>
        <Divider />
      </Box>
    </Box>
  )
}
