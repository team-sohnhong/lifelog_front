import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import App from "./App"
import "./index.css"
import { QuestionProps } from "./type/questionInteface"

const post: QuestionProps = {
  date: "today",
  title: "Default title",
  content:
    "I'm currently trying to make a quote system for my forum and since I am using bb-codes throughout the whole system I want to implement this for quoting aswell. I have created what I want the quote tag ...",
  vote: 2,
  answer: 0,
  tags: ["tag1"],
  created_at: Date.now(),
  writer: "userName",
};

const posts: QuestionProps[] = [post, post, post, post, post] //post의 개수 만큼 리스트 생성

function reducer(state = posts, action: any) {
  if (action.type === "증가") {
    console.log(action.payload);
    state.push(action.payload);
    return state;
  } else if (action.type === "감소") {
    // state.posts.
    return state;
  } else {
    return state;
  }
}

let store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
