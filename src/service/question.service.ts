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

const getQuestion = async (id: string) => {
  try {
    const response = await apiRequest.get(`/questions/${id}`);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const closeQuestion = async (id: string) => {
  try {
    const response = await apiRequest.patch(`/questions/close/${id}`, {
      closed: true,
    });
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

const postQuestion = async (question: any) => {
  try {
    const response = await apiRequest.post(`/questions`, question);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const questionService = {
  getQuestions,
  getQuestion,
  postQuestion,
  deleteQuestion,
  closeQuestion,
};

export default questionService;
