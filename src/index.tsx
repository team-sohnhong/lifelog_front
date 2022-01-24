import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import App from "./App"
import "./index.css"
import { PostProps, Posts } from "./routes/Home"

const post: PostProps = {
  date: "today",
  title: "ㄱㄱㄱ",
  content: "content",
  vote: 2,
  answer: 0,
  tags: ["tag1"],
  created_at: Date.now(),
  writer: "userName",
}

const posts: Posts = {
  posts: [post, post, post, post, post], //post의 개수 만큼 리스트 생성
}

function reducer(state = posts.posts, action: any) {
  if (action.type === "증가") {
    state.push(post)
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
