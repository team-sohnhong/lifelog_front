import { Answer } from "domain/type/answerInterface";
import { defaultQuestion, Question } from "domain/type/questionInteface";
import { useEffect, useState } from "react";
import answerService from "services/answer.service";
import contractService from "services/contract.service";
import questionService from "services/question.service";

export function useQuestionDetail(questionId: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    question: defaultQuestion,
    answers: [] as Answer[],
  });
  const [hasError, setHasError] = useState(false);
  const { question, answers } = data;

  const handleCloseQuestion = async () => {
    // execute contract first
    const isClosed = await contractService.closeQuestion(questionId);
    if (isClosed) {
      // then execute backend
      const closedQuestion: Question = await questionService.closeQuestion(questionId);
      setData({
        question: closedQuestion,
        answers,
      });
    } else {
      console.error("Error. Fail to closeQuestion on blockchain");
    }
  };

  const handleChooseAnswer = async (
    answerId: string,
    winnerAddress: string
  ) => {
    // execute contract first
    const isTxSucceed = await contractService.chooseAnswer(
      questionId,
      winnerAddress
      );
    if (isTxSucceed) {
      // then execute backend
      const chosenAnswer: Answer = await answerService.chooseAnswer(answerId);
      setData({
        question,
        answers: answers.map((answer: Answer) =>
          answer.id === answerId ? chosenAnswer : answer
        ),
      });
    } else {
      console.error("Error. Fail to upload on blockchain");
    }
  };

  const fetchData = async () => {
    try {
      //컨트랙트 선 실행하기
      const questionRes = await questionService.getQuestion(questionId);
      const answersRes = await answerService.getAnswers(questionId);
      setData({ question: questionRes, answers: answersRes });
    } catch (e) {
      setHasError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return {
    data,
    loading,
    hasError,
    handleCloseQuestion,
    handleChooseAnswer,
  }; // 모든 값과 함수 반환
}

export default useQuestionDetail;
