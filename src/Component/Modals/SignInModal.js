import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {startUserListener} from '../../redux/ActionCreators'
import firebase from 'firebase';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
    startUserListener: () =>{dispatch(startUserListener())}
  })

class FormDialog extends Component {
    state = {
        open: false,
        isSignedIn: false
    };

    // Configure FirebaseUI.
    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: (authResult) => {
                this.props.startUserListener()
                this.setState({open:false})
                return false
            }
        }
    };

    // Listen to the Firebase Auth state and set the local state.
    componentDidMount() {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => {this.setState({ isSignedIn: user })
            this.props.startUserListener()
        }
        );
    }

    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
        this.unregisterAuthObserver();
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        if(!this.state.isSignedIn){
        return (
            <div>
                <Button color="inherit" onClick={this.handleClickOpen}>Login</Button>
                 <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Please Sign-In:</DialogTitle>
                    <DialogContent>
                            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            </div>
        );}
        else{
        return(<Button color="inherit" onClick={() => firebase.auth().signOut()} >Logout ({firebase.auth().currentUser.displayName})</Button>)
        }
    }
}
export default connect(null,mapDispatchToProps)(FormDialog)