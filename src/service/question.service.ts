import { apiRequest } from "./axios";

const getQuestions = async () => {
  const response = await apiRequest.get(`/questions`);
  const { data } = response;
  console.log("🚀 ~ file: Home.tsx ~ line 16 ~ getQuestions ~ data", data);
};

const updateQuestion = async () => {
  const response = await apiRequest.patch(`/questions/`);
};

const deleteQuestion = async () => {
  const response = await apiRequest.delete(`/questions/${params.id}`);
  console.log(
    "🚀 ~ file: Question.tsx ~ line 47 ~ deleteQuestion ~ response",
    response
  );
  navigate("/");
};

const questionService = {
  getQuestions,
  deleteQuestion,
  updateQuestion,
};

export default questionService;
