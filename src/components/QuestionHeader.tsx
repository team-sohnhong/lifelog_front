import { Grid, Typography, Button, Box, Divider } from "@mui/material"

export default function QuestionHeader() {
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
        <Button variant="contained" color="primary">
          Add Questions
        </Button>
      </Grid>
      <Box sx={{ mt: 5 }}>
        <Typography px={2}>22,142,347 questions</Typography>
        <Divider />
      </Box>
    </Box>
  )
}
