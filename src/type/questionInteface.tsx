// export interface QuestionProps {
//   title: string
//   content: string
//   vote: number
//   answer: number
//   tags: Array<string>
//   created_at: number
//   writer: string
// }

export interface QuestionProps {
  id: string
  category: number
  title: string
  content: string
  adopted: boolean
  created_at: string
  owner: string
}

export const defaultQuestion: QuestionProps = {
  id: "",
  category: 0,
  title: "",
  content: "",
  adopted: false,
  created_at: "",
  owner: "",
}

// vote: number
// answer: number
// tags: Array<string>
// writer: string

// vote: 2,
// answer: 3,
// tags: ["태그1"],
// writer: "Writer",
