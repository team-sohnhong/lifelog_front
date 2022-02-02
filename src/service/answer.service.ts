import { apiRequest } from ".";

const getAnswers = async (questionId: string) => {
  try {
    const response = await apiRequest.get(`/answers?id=${questionId}`);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const getAnswer = async (id: string) => {
  try {
    const response = await apiRequest.get(`/answers/${id}`);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const postAnswer = async (answer: any) => {
  try {
    const response = await apiRequest.post(`/answers`, answer);
    const { data } = response;
    console.log("🚀 SUCCESS!!", response);
    return data;
  } catch (err) {
    return null;
  }
}

const updateAnswer = async () => {
  try {
    const response = await apiRequest.put(`/answers/`);
    const { data } = response;
    return data;
  } catch (err) {
    return err;
  }
};

const deleteAnswer = async (id: string) => {
  try {
    const response = await apiRequest.delete(`/answers/${id}`);
    const { data } = response;
    return data;
  } catch (err) {
    console.log(
      "🚀 ~ file: answer.service.ts ~ line 52 ~ deleteAnswer ~ err",
      err
    );
  }
};

const answerService = {
  getAnswers,
  deleteAnswer,
  updateAnswer,
  getAnswer,
  postAnswer,
};

export default answerService;
