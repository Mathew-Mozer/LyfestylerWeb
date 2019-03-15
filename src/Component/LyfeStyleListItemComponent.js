import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import {Button} from 'reactstrap'
import { withRouter } from 'react-router-dom'
import firebase from '../Firebase/firebase'

const styles = theme => ({
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    }
});

class LyfeStyleListItemComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: true,
            expandedItem: null,
            checked: false
        };
    }


    handleToggle = () => {
        /*
        const { checked } = this.state;
        this.setState({
            checked: !checked,
        });
        */
       console.log("clicked",this.props.ItemDetails.subscriptionId)
        firebase.firestore().collection("subscriptions").doc(firebase.auth().currentUser.uid).collection("lyfestyles").doc(this.props.ItemDetails.subscriptionId).update({active:!this.props.ItemDetails.subscription.active})
    .catch(error=> console.log("Error:",error))
    
    };
    handleListEditItemClick = (LyfeStyleType) => {
        console.log("Clicked", LyfeStyleType)
        let { history } = this.props;
        history.push({
            pathname: `/lyfestyleedit/${LyfeStyleType.id}`
        });
       
        //alert(LyfeStyleType.id)
    }

    handleSubscribeClick = (LyfeStyleType)=>{
        console.log("Subscribe to:" + JSON.stringify(LyfeStyleType))
        var payload={read:true,subscribed:true,active:true}
        firebase.firestore().collection("subscriptions").doc(firebase.auth().currentUser.uid).collection("lyfestyles").doc(LyfeStyleType.id).set(payload)
        .then((data) => console.log("Dispatch", data))
        .catch(error => console.log("Error:", error))
        
        
    }
    render() {
        const { classes } = this.props;
        const LyfeStyleType = this.props.ItemDetails
        return (
            <ListItem style={{ padding:"0px", height: "45px" }} key={LyfeStyleType.id} button onClick={this.toggle}>
                <ListItemAvatar>
                    <Avatar className={classes.purpleAvatar}>K</Avatar>
                </ListItemAvatar>
                <ListItemText secondary={LyfeStyleType.manager ? `Managed By:${LyfeStyleType.manager}` : LyfeStyleType.createdBy ? `Created By:${LyfeStyleType.createdBy}` : ''}>
                    {LyfeStyleType.name}
                </ListItemText>
                <ListItemSecondaryAction>

                    {LyfeStyleType.managed ? <></> : this.props.editButton?<IconButton onClick={() => this.handleListEditItemClick(LyfeStyleType)} aria-label="Delete">
                        <EditIcon />
                    </IconButton>:<></>}
                    {this.props.activeToggle?<Switch onChange={this.handleToggle} checked={LyfeStyleType.subscription.active}/>:<></>}
                    {this.props.subscribeButton?<Button color="info" onClick={()=>this.handleSubscribeClick(LyfeStyleType)}>Subscribe</Button>:<></>}
                </ListItemSecondaryAction>
            </ListItem>
        )
    }
}
LyfeStyleListItemComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(LyfeStyleListItemComponent));
