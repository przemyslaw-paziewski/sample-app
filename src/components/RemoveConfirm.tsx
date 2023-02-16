import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material'
import { useModal } from '@/context/modalContext'
import PageTexts from '@/enums/pageTexts'

interface Props {
  handleSubmit: () => void
}

export default function RemoveConfirm({ handleSubmit }: Props): JSX.Element {
  const { handleClose } = useModal()
  return (
    <>
      <DialogTitle>{PageTexts.REMOVE_MODAL_TITLE}</DialogTitle>
      <DialogContent>
        <DialogContentText>{PageTexts.REMOVE_MODAL_TEXT}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{PageTexts.CANCEL}</Button>
        <Button onClick={handleSubmit} variant="contained">
          {PageTexts.REMOVE}
        </Button>
      </DialogActions>
    </>
  )
}
