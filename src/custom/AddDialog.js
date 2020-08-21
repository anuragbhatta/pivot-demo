import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
import tick_mark from "../assets/tick_mark.png";


const DialogBox = styled(Dialog)`
 .MuiDialog-paperWidthXs {
   border-radius:20px;
 }
 .MuiDialogTitle-root {
  text-align: center;
  vertical-align: middle;
 }
 .MuiDialogContent-root {
  text-align: center;
  vertical-align: middle;
 }
 .MuiTypography-h6 {
   font-size: 100%;
   text-align: center;
   vertical-align: middle;
   margin-top: 0px;
 }
  && {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: -webkit-fill-available;
    width: -moz-available;
    border-radius: 20px;
  }
`;
const DialogButton = styled(Button)`
  && {
    color: black;
    background-color: white;
    height: 80px;
  }
`;

const DialogActionsWrapper = styled(DialogActions)`
&& {
  text-align: center;
  vertical-align: middle;
}
`
const CustomWrapper = styled.div`
  border-radius: 20px;
`;

const CloseIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
const DialogContentWrapper = styled(DialogContent)`
  && {
    text-align: center;
  }
`
// const DialogTitle = ((props) => {
//   const { children, classes, onClose, ...other } = props;
//   return (
//     <MuiDialogTitle disableTypography {...other}>
//       <Typography variant="h6">{children}</Typography>
//       {onClose ? (
//         <IconButton aria-label="close" onClick={onClose}>
//           <CloseIcon />
//         </IconButton>
//       ) : null}
//     </MuiDialogTitle>
//   );
// });


export default function AddDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let {
    title,
    label,
    submitButton,
    fullWidth,
    maxWidth,
    openAdd,
    handleCloseAddDialog,
    loading,
    handleChange,
    handleKeyPress,
    itemValue,
    handleSubmit,
    completed,
    loadingMessage,
    completedMessage,
    closeButton,
    isEditMode,
    deleteMode,
  } = props;

  console.log(props);

  return (
    <CustomWrapper>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <DialogBox
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={openAdd}
        // open={true}
        onClose={handleCloseAddDialog}
        aria-labelledby="form-dialog-title"
      >

        {
          loading
            ?
            <Fragment>
              <CloseIconWrapper>
                <IconButton aria-label="close" onClick={handleCloseAddDialog}>
                  <CloseIcon />
                </IconButton>
              </CloseIconWrapper>
              <DialogTitle style={{ color: "white" }} id="form-dialog-title">{title}</DialogTitle>
              <DialogContent>
                <p>
                  {loadingMessage}
                </p>
              </DialogContent>
              <DialogActionsWrapper>
                <DialogButton fullWidth onClick={(e) => { handleSubmit(e) }} color="primary">
                </DialogButton>
              </DialogActionsWrapper>
            </Fragment>
            :
            (
              (completed === true)
                ?
                (
                  <Fragment>
                    <CloseIconWrapper>
                      <IconButton aria-label="close" onClick={handleCloseAddDialog}>
                        <CloseIcon />
                      </IconButton>
                    </CloseIconWrapper>
                    <DialogTitle style={{ color: "white" }} id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                      <img src={tick_mark} width="80" height="auto" alt="login" />
                      <div>
                        <p>{completedMessage}</p>
                      </div>
                    </DialogContent>
                    <DialogActionsWrapper>
                      <DialogButton fullWidth onClick={handleCloseAddDialog} >
                        {closeButton}
                      </DialogButton>
                    </DialogActionsWrapper>
                  </Fragment>
                )
                :
                (
                  <Fragment>
                    <CloseIconWrapper>
                      <IconButton aria-label="close" onClick={handleCloseAddDialog}>
                        <CloseIcon />
                      </IconButton>
                    </CloseIconWrapper>
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                      {
                        isEditMode
                          ?
                          <TextField
                            autoFocus
                            margin="dense"
                            id="newtask"
                            label={label}
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            // onKeyPress={handleKeyPress}
                            defaultValue={itemValue}
                          />
                          :
                          (
                            deleteMode
                              ?
                              <p>{label}</p>
                              :
                              (
                                <TextField
                                  autoFocus
                                  margin="dense"
                                  id="newtask"
                                  label={label}
                                  type="text"
                                  fullWidth
                                  onChange={handleChange}
                                  onKeyPress={handleKeyPress}
                                  value={itemValue}
                                />
                              )
                          )

                      }



                    </DialogContent>
                    <DialogActionsWrapper>
                      <DialogButton fullWidth onClick={(e) => { handleSubmit(e) }} >
                        {submitButton}
                      </DialogButton>
                    </DialogActionsWrapper>
                  </Fragment>
                )

            )


        }


      </DialogBox>
    </CustomWrapper>
  );
}
