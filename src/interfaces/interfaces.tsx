import { type Dispatch, type SetStateAction } from "react"

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
  children: JSX.Element
}

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}

export interface ModalDefaultProps {
  modal: {
    isOpen: boolean
    content: JSX.Element | undefined
  }
  setModal: Dispatch<
    SetStateAction<{
      isOpen: boolean
      content: JSX.Element | undefined
    }>
  >
  handleOpen: () => void
}
