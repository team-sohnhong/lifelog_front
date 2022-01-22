import {
  Grid,
  Typography,
  Button,
  Box,
  Divider,
  Card,
  CardActions,
  CardContent,
  Link,
  List,
  ListItem,
} from "@mui/material"
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew"

export default function QuestionList() {
  return (
    <List>
      {[0, 1, 2, 3].map(() => {
        return (
          <Card sx={{ minWidth: 275, mb: 1 }}>
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
                    0
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    vote
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    0
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    answer
                  </Typography>
                </Box>
              </Grid>
              {/* content-body */}
              <Grid item xs={11} mx={"auto"}>
                <CardContent>
                  <Link href="/home" underline="none">
                    <Typography sx={{ fontSize: 20 }} gutterBottom>
                      사용자가 적은 제목
                    </Typography>
                  </Link>
                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    I'm currently trying to make a quote system for my forum and
                    since I am using bb-codes throughout the whole system I want
                    to implement this for quoting aswell. I have created what I
                    want the quote tag ...
                  </Typography>
                </CardContent>
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
                      <Button size="small">#TagName</Button>
                    </Grid>
                    <Grid item mr={5}>
                      <Typography>22/01/10 10:22</Typography>
                      <AccessibilityNewIcon></AccessibilityNewIcon>
                      <Link href="/user" underline="none">
                        <Typography>userName</Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </CardActions>
              </Grid>
            </Grid>

            <Divider />
          </Card>
        )
      })}
      <ListItem></ListItem>
    </List>
  )
}
