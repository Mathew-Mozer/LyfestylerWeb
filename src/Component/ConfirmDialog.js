import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmDialog extends React.Component {
   state={
     isOpen:false,
     stateChangeItem:null
   }
   
   
  static getDerivedStateFromProps(nextProps, prevState){
    if(nextProps.openOnStateChange!==prevState.stateChangeItem){
      return { stateChangeItem: nextProps.openOnStateChange,isOpen:nextProps.openOnStateChange.id?true:false};
   }
   else return null;
 }

  render() {
    return (
      <>
        <Dialog
          open={this.state.isOpen}
          onClose={()=>this.props.handleAlertClose(false)}
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
            <Button onClick={()=>this.props.handleAlertClose(false)} color={this.props.disAgreeColor}>
              {this.props.disagree}
            </Button>
            <Button onClick={()=>this.props.handleAlertClose(true)} color={this.props.agreeColor} autoFocus>
              {this.props.agree}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default ConfirmDialog;