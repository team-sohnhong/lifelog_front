//Redux Ducks pattern
//action type과 action과 reducer를 한 파일에서 관리한다. - 기능 중심
// 1. reducer는 export default로 내보낸다.
// 2. action 함수는 export로 내보낸다.
// 3. 액션타입을 정의할 때 reducer/ACTION_TYPE형태로 적어줘야 한다. 이렇게 접두사를 붙여주는 이유는 서로다른 리듀서에서 액션이름이 중첩되는것을 방지하기위해서이다.
//씨부레 redux tookit을 사용해야 코드량을 줄일 수 있다.
// 굳이 왜 성공 실패 

// action   
const GET = "question/GET";

//action creators
export const get = () => ({
  type: GET,
});

export const decrement = () => ({
  type: GET,
});


// reducer
const initState = {
  list: [],
};

const questionReducer = (state = initState, action: any) => {
  switch (action.type) {
    case GET:
      return {
        list: action.payload.list,
      };
    default:
      return {
        ...state,
      };
  }
};

export default questionReducer;
