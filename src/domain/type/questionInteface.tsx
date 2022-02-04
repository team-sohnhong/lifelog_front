export interface Question {
  id: string;
  category: number;
  title: string;
  content: string;
  closed: boolean;
  created_at: string;
  owner: string;
  reward: number;
}

export const defaultQuestion: Question = {
  id: "",
  category: 0,
  title: "",
  content: "",
  closed: false,
  created_at: "",
  owner: "",
  reward: 0,
};
