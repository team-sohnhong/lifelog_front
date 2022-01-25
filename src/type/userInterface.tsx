export interface User {
  name: string
  address: string
  created_at: string
}

export const defaultUser = {
  name: 'name',
  address: 'address',
  created_at: 'today',
}
