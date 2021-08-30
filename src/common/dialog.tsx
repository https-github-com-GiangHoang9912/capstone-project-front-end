import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { withStyles } from '@material-ui/core'

DialogComponent.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  buttonAccept: PropTypes.string,
  buttonCancel: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

DialogComponent.defaultProps = {
  className: '',
  message: '',
  buttonAccept: '',
  id: '',
}

function DialogComponent(props?: any) {
  const {
    className,
    title,
    message,
    content,
    buttonAccept,
    buttonCancel,
    isOpen,
    handleAccept,
    handleClose,
    id,
  } = props

  const StyledDialog = withStyles({
    root: {
      zIndex: 2000,
    },
  })(Dialog)

  return (
    <div className={className}>
      {id === 'subject' ? (
        <StyledDialog
          open={isOpen}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">{message}</DialogContentText>
            {content}
          </DialogContent>
          <DialogActions>
            {buttonAccept ? (
              <Button onClick={handleAccept} color="primary">
                {buttonAccept}
              </Button>
            ) : (
              ''
            )}
            <Button onClick={handleClose} color="primary">
              {buttonCancel}
            </Button>
          </DialogActions>
        </StyledDialog>
      ) : (
        <Dialog
          open={isOpen}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">{message}</DialogContentText>
            {content}
          </DialogContent>
          <DialogActions>
            {buttonAccept ? (
              <Button onClick={handleAccept} color="primary">
                {buttonAccept}
              </Button>
            ) : (
              ''
            )}
            {buttonCancel ? (
              <Button onClick={handleClose} color="primary">
                {buttonCancel}
              </Button>
            ) : (
              ''
            )}
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}

const StyledDialog = styled(DialogComponent)``

export default StyledDialog
