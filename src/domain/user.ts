export type UserName = string;

export type User = {
  address: string;
  created_at: string;
  _v: number;
  _id: string;
};


export function hasAddress(user: User, address: string): boolean {
  return user.address.length > 0;
}

///TODO: infra의 userRepostiry의 모습이 여기 담길 것..
// export type UserRepository = {
//   byAuthInfo: (UserAuthInfo) => Promise<User>;
//   add: (UserAuthInfo) => Promise<User>;
//   update: (EditingUser, WithCurrentUser) => Promise<User>;
//   getByToken: (WithCurrentUser) => Promise<User>;
// };


// export function hasAllergy(user: User, ingredient: Ingredient): boolean {
//   return user.allergies.includes(ingredient);
// }

// export function hasPreference(user: User, ingredient: Ingredient): boolean {
//   return user.preferences.includes(ingredient);
// }
