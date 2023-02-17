import { type BaseSyntheticEvent } from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material'
import { useModal } from '@/context/modalContext'
import PageTexts from '@/enums/pageTexts'

interface Props {
  handleSubmit: (e: Event | BaseSyntheticEvent) => void
}

export default function NewPostForm({ handleSubmit }: Props): JSX.Element {
  const { handleClose } = useModal()
  return (
    <>
      <DialogTitle>{PageTexts.ADD_MODAL_TITLE}</DialogTitle>
      <DialogContent sx={{ width: '500px', maxWidth: '100%' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="content"
            label="Content"
            multiline
            rows={4}
            fullWidth
          />
          <DialogActions>
            <Button onClick={handleClose} type="button">
              {PageTexts.CANCEL}
            </Button>
            <Button type="submit" variant="contained">
              {PageTexts.ADD}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </>
  )
}
