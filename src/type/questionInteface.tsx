export interface QuestionProps {
  date: string
  title: string
  content: string
  vote: number
  answer: number
  tags: Array<string>
  created_at: number
  writer: string
}

// const question: QuestionProps = {
//   date: "today",
//   title: "title",
//   content: "content",
//   vote: 2,
//   answer: 0,
//   tags: ["tag1"],
//   created_at: Date.now(),
//   writer: "userName",
// }
