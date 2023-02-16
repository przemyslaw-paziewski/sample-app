import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useState,
} from 'react'
import Dialog from '@mui/material/Dialog'

interface ModalContextInterface {
  setModal: Dispatch<
    SetStateAction<{
      isOpen: boolean
      content: JSX.Element | undefined
    }>
  >
  handleClose: () => void
}

export const ModalContext = createContext<ModalContextInterface>({
  setModal: () => {},
  handleClose: () => {},
})

export const ModalContextProvider = ({
  children,
}: {
  children: JSX.Element[]
}): JSX.Element => {
  const [modal, setModal] = useState<{
    isOpen: boolean
    content: JSX.Element | undefined
  }>({
    isOpen: false,
    content: undefined,
  })
  const handleClose = (): void => {
    setModal({ content: undefined, isOpen: false })
  }

  return (
    <ModalContext.Provider value={{ setModal, handleClose }}>
      {children}
      <Dialog
        open={modal.isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modal.content}
      </Dialog>
    </ModalContext.Provider>
  )
}

export const useModal = (): ModalContextInterface => useContext(ModalContext)
