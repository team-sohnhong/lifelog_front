export interface User {
  address: string;
  created_at: string;
  _v: number;
  _id: string;
}

export const defaultUser: User = {
  address: "address",
  created_at: Date.now().toString(),
  _v: 0,
  _id: "",
};
