import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { compareByName } from '../shared/sortTools'
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  root: {
    width: '100%',
    maxHeight: 360,
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
});

class SelectedListItem extends React.Component {
  state = {
    selectedIndex: 1,
  };

  handleListItemClick = (ingredient) => {
    this.props.editIngredient(ingredient)
  };
  getIngredientFromArray=(id)=>{
    return(this.props.ingredients.filter((ing)=>ing.id===id)[0].name)
  }
  getTagList = (ingredient) => {
    //const tmp=.map((item,index)=>(index?`,${()=>this.getIngredientFromArray(item)}`:()=>this.getIngredientFromArray(item)))
    if(ingredient.length===0)
        return("None")
    const tmp = this.props.ingredients.filter((ing)=>ingredient.includes(ing.id)).map((item)=>item.name).toString()
    return(tmp)
  }
  render() {
    const { classes } = this.props;
    
    return (
        
      <div className={classes.root}>
        
        <List component="nav">
        {this.props.ingredients.sort(compareByName).filter((ingredient)=>ingredient.name.toLowerCase().includes(this.props.filterParam.toLowerCase())).map((ingredient) =>{
        return(<ListItem key={ingredient.id}
          button
          onClick={() => this.handleListItemClick(ingredient)}>
          <ListItemText primary={ingredient.name} secondary={this.getTagList(ingredient.tags)} />
        </ListItem>)
        })}
        </List>
      </div>
    );
  }
}

SelectedListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectedListItem);