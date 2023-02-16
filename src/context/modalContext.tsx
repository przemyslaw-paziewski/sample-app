import { createContext, useContext, useState } from "react"
import { createPortal } from "react-dom"
import Dialog from "@mui/material/Dialog"
import { type ModalDefaultProps } from "@/interfaces/interfaces"

export const ModalContext = createContext<ModalDefaultProps | null>(null)

export const ModalContextProvider = ({
  children,
}: {
  children: JSX.Element[]
}): JSX.Element => {
  const [modal, setModal] = useState<ModalDefaultProps["modal"]>({
    isOpen: false,
    content: undefined,
  })

  const handleOpen = (): void => {
    setModal((m) => ({ ...m, isOpen: true }))
  }

  const handleClose = (): void => {
    setModal({ content: undefined, isOpen: false })
  }

  return (
    <ModalContext.Provider value={{ modal, setModal, handleOpen }}>
      {children}
      {createPortal(
        <Dialog
          open={modal.isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {modal.content}
        </Dialog>,
        document.getElementById("modal-root") as HTMLElement
      )}
    </ModalContext.Provider>
  )
}

export const useUtil = (): ModalDefaultProps | null => useContext(ModalContext)
