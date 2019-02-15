import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Switch from '@material-ui/core/Switch';
import Avatar from '@material-ui/core/Avatar';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { Collapse,Row,Col } from 'reactstrap'
import { ListSubheader } from '@material-ui/core';

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
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: true,
            expandedItem:null,
            checked:false
        };
      }
    
    toggle() {
        if(this.props.expandedItem===this.props.ItemDetails.id){
            this.props.onExpand(-1)
        }else{
            this.props.onExpand(this.props.ItemDetails.id)
        }
        
      }
      static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.expandedItem===nextProps.ItemDetails.id){
            return({collapse:false})
        }
        else if(nextProps.expandedItem===nextProps.ItemDetails.id){
            return({collapse:false})
        }else{
            return({collapse:true})
        }
    }
    handleToggle = () => {
        const { checked } = this.state;
        this.setState({
          checked: !checked,
        });
      };
    render(){
        const { classes } = this.props;
        const LyfeStyleType = this.props.ItemDetails
        return (
          <ListItem style={{height:"45px"}} key={LyfeStyleType.id} button onClick={this.toggle}>
            <ListItemAvatar>
            <Avatar className={classes.purpleAvatar}>K</Avatar>
            </ListItemAvatar>
            <ListItemText  secondary={LyfeStyleType.manager?`Managed By:${LyfeStyleType.manager}`:LyfeStyleType.createdBy?`Created By:${LyfeStyleType.createdBy}`:''}>
            {LyfeStyleType.name}
            </ListItemText>
            <ListItemSecondaryAction>
            <Switch
              onChange={this.handleToggle}
              checked={this.state.checked}
            />
            </ListItemSecondaryAction>
          </ListItem>
        )
    }
}
LyfeStyleListItemComponent.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(LyfeStyleListItemComponent);
