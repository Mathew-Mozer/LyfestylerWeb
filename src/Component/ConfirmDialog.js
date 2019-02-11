import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmDialog extends React.Component {
   
  handleClose = (close) => {
    this.props.handleAlertClose(close)
  };

  render() {
    return (
      <>
        <Dialog
          open={this.props.isOpen}
          onClose={()=>this.handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            {this.props.message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.handleClose(false)} color={this.props.disAgreeColor}>
              {this.props.disagree}
            </Button>
            <Button onClick={()=>this.handleClose(true)} color={this.props.agreeColor} autoFocus>
              {this.props.agree}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default ConfirmDialog;