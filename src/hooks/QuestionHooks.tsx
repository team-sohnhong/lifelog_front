import { QuestionProps, defaultQuestion } from "domain/type/questionInteface";
import { useEffect, useState } from "react";
import questionService from "service/question.service";

const useQuestion = (initialQuestion: QuestionProps, questionId: string) => {
  const [question, setQuestion] = useState<QuestionProps>(defaultQuestion);

  useEffect(() => {
    questionService
      .getQuestion(questionId)
      .then(questionRes => setQuestion(questionRes));
  }, []);

  return { question, setQuestion };
};

// const useQuestion = (initialQuestion: QuestionProps, questionId: string) => {
//   const [question, setQuestion] = useState<QuestionProps>(defaultQuestion);

//   useEffect(() => {
//     questionService
//       .getQuestion(questionId)
//       .then(questionRes => setQuestion(questionRes));
//   }, []);

//   return { question, setQuestion };
// };



export default useQuestion;
