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
export interface PageWrapperProps {
  metaTitle: string
  metaDescription: string
  children: JSX.Element[] | JSX.Element
}
export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}
export interface Posts {
  userId: number
  id: number
  title: string
  body: string
}
