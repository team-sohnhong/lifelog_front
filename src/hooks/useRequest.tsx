import { Answer } from "domain/type/answerInterface";
import { defaultQuestion } from "domain/type/questionInteface";
import { useEffect, useState } from "react";
import answerService from "service/answer.service";
import questionService from "service/question.service";

function useQuestionDetail(questionId: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    question: defaultQuestion,
    answers: [] as Answer[],
  });
  const [hasError, setHasError] = useState(false);

  const fetchData = async () => {
    try {
      //컨트랙트 선 실행
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
  return { data, setData, loading, setLoading, hasError, setHasError }; // 현재 값들을 배열로 반환
}

export default useQuestionDetail;
// const getQuestion = async () => {
//   const questionRes = await questionService.getQuestion(questionId);
//   setResponse({ ...response, questionData: questionRes });
// };

// const getAnswers = async () => {
//   const answersRes = await answerService.getAnswers(questionId);
//   setResponse({ ...response, answersData: answersRes });
// };
// try {
//   //블록체인에 데이터 있는지 확인하고 실행 예정.
//   getQuestion(); // 질문 리스폰스 등록
//   getAnswers();
// } catch (e: any) {
//   setError(e); // error 설정
// }
// setLoading(false); // 로딩 끝
// 렌더링 될 때만 실행됨
