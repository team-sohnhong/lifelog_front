import { Answer, defaultAnswer } from "domain/type/answerInterface";
import { useEffect, useState } from "react";
import answerService from "service/answer.service";

const useAnswers = (questionId: string) => {
  const [answers, setAnswers] = useState<Answer[]>([defaultAnswer]);

  const getAnswers: any = async () => {
    const answersRes = await answerService.getAnswers(questionId);
    setAnswers(answersRes);
    return answersRes;
  };

  useEffect(() => {
    getAnswers();
  }, []);

  return { answers, setAnswers };
};

export default useAnswers;
