import { enums } from "@/constants/enums"
import { useModal } from "@/context/modalContext"
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { type BaseSyntheticEvent } from "react"

export const usePostDelete = (): {
  handleDelete: (event: Event | BaseSyntheticEvent) => void
} => {
  const { setModal, handleClose } = useModal()
  const handleRemove = (): void => {}

  const handleDelete = (event: Event | BaseSyntheticEvent): void => {
    event.preventDefault()
    event.stopPropagation()
    setModal({
      isOpen: true,
      content: (
        <>
          <DialogTitle>{enums.REMOVE_MODAL_TITLE}</DialogTitle>
          <DialogContent>
            <DialogContentText>{enums.REMOVE_MODAL_TEXT}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{enums.CANCEL}</Button>
            <Button onClick={handleRemove} variant="contained">
              {enums.REMOVE}
            </Button>
          </DialogActions>
        </>
      ),
    })
  }

  return { handleDelete }
}
