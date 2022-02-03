import { Box, Divider, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import answerService from "service/answer.service";
import { v4 as uuidv4 } from "uuid";

export default function AnswerWrite({ userId }: { userId: string }) {
  const params = useParams();
  const navigate = useNavigate();

  const [answerTitle, setAnswerTitle] = useState("");
  const [answerContent, setAnswerContent] = useState("");

  const onAnswerTitleChange = (e: any) => {
    setAnswerTitle(e.target.value);
  };

  const onAnswerBodyChange = (e: any) => {
    setAnswerContent(e.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let answer = {
      title: answerTitle,
      id: uuidv4(),
      content: answerContent,
      adopted: false,
      owner: userId,
      related: params.id!,
    };

    answerService.postAnswer(answer).then((data: any) => {
      data ? navigate("/") : console.log("ERROR");
    });
  };
  return (
    <Box>
      <Divider />
      <h2>답변 작성하기</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          name="answer"
          value={answerTitle}
          onChange={onAnswerTitleChange}
          variant="standard"
          placeholder="제목"
          fullWidth
          required
          sx={{
            mb: 3,
          }}
        />
        <TextField
          name="answer"
          value={answerContent}
          onChange={onAnswerBodyChange}
          variant="outlined"
          placeholder="답변"
          multiline
          required
          minRows={10}
          fullWidth
          sx={{
            mt: 3,
            mb: 3,
          }}
        />
        <Button type="submit" variant="contained" color="secondary">
          답변 등록하기
        </Button>
      </form>
    </Box>
  );
}
