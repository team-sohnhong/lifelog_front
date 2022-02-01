import { apiRequest } from ".";

const getQuestions = async () => {
  try {
    const response = await apiRequest.get(`/questions`);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const updateQuestion = async () => {
  try {
    const response = await apiRequest.patch(`/questions/`);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const deleteQuestion = async (id: string) => {
  try {
    const response = await apiRequest.delete(`/questions/${id}`);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const questionService = {
  getQuestions,
  deleteQuestion,
  updateQuestion,
};

export default questionService;
