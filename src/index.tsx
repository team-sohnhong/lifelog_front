import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import App from "./App"
import "./index.css"
import { defaultQuestion, QuestionProps } from "./type/questionInteface"

// 예시용 redux용 questions입니다. 이 곳 외 사용되지 않음.
const questions: QuestionProps[] = [
  defaultQuestion,
  defaultQuestion,
  defaultQuestion,
  defaultQuestion,
  defaultQuestion,
]

function reducer(state = questions, action: any) {
  if (action.type === "증가") {
    console.log(action.payload)
    state.push(action.payload)
    return state
  } else if (action.type === "감소") {
    // state.posts.
    return state
  } else {
    return state
  }
}

let store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
