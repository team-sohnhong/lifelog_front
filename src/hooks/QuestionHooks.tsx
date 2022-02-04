import { defaultQuestion, Question } from "domain/type/questionInteface";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import questionService from "service/question.service";
import { RootState } from "store";

const useQuestion = (questionId: string) => {
  const [question, setQuestion] = useState<Question>(defaultQuestion);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const getQuestion = async () => {
    try {
      const qestion = await questionService.getQuestion(questionId);
    } catch (e) {}
  };
  const { questions } = useSelector((state: RootState) => state.question);

  useEffect(() => {
    if (questions) {
      return;
    }

    setLoading(true);
    questionService
      .getQuestion(questionId)
      .then(questionRes => setQuestion(questionRes));
    setHasError(true);
    setLoading(false);
  }, []);

  return { question, setQuestion };
};

export default useQuestion;
