export interface Answer {
  title: string;
  id: string;
  content: string;
  related: string;
  owner: string;
  created_at: number
}

export const defaultAnswer: Answer = {
  title: "default title",
  id: "default id",
  content: "default content",
  related: "default related question id",
  owner: "default owner",
  created_at: Date.now(),
};
