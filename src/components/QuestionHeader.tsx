import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "domain/type/userInterface";
import { QuestionProps } from "../domain/type/questionInteface";
import BasicModal from "./modal/Modal";
export default function QuestionHeader({
  questions,
}: {
  questions: QuestionProps[];
}) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const user = useSelector((state: User) => state);

  const numberOfQuestion = questions.length;

  const handleAddQuestion = () => {
    if (user.address) {
      navigate("/write");
    } else {
      setShowModal(!showModal);
    }
  };
  return (
    <Box>
      <Grid
        container
        spacing={0}
        px={2}
        pt={2}
        justifyContent={"space-between"}
      >
        <Typography variant="h4" color="#D8D8D8">
          All Questions
        </Typography>
        <Button onClick={handleAddQuestion} variant="contained" color="primary">
          Add Question
        </Button>
      </Grid>
      <BasicModal
        showModal={showModal}
        setShowModal={setShowModal}
      ></BasicModal>

      <Box sx={{ mt: 5 }}>
        <Typography px={2} color="#D8D8D8">
          {numberOfQuestion} questions
        </Typography>
        <Divider />
      </Box>
    </Box>
  );
}
