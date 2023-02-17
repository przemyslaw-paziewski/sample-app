export interface User {
  id: number
  name: string
  username: string
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}
export interface Posts {
  userId: number
  id: number
  title: string
  body: string
}

export interface Comment {
  id: number
  email: string
  body: string
  name: string
}
