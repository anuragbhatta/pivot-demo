import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openAdd}
        onClose={handleCloseAddDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a Task</DialogTitle>
        <DialogContent>
        {
          loading
            ?
            'Creating Item...'
            :
             'Create Item'
        }
          <TextField
            autoFocus
            margin="dense"
            id="newtask"
            label="New Task"
            type="text"
            fullWidth
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={itemValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => { handleCloseAddDialog(e) }} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => { handleSubmit(e) }} color="primary">
            Add
          </Button>
        </DialogActions>
        
      </Dialog>
    </div>
  );
}
