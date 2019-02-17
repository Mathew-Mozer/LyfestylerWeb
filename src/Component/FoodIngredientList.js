import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { compareByName } from '../shared/sortTools'
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircle from '@material-ui/icons/AddCircle'
import IconButton from '@material-ui/core/IconButton';
import ConfirmDialog from './ConfirmDialog'
import { Row, Container, Col, Button, InputGroup, InputGroupAddon, Input,Label } from 'reactstrap'
import IngredientModal from './Modals/IngredientModal'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
});

class FoodIngredientList extends React.Component {
  state = {
    selectedIndex: 1,
    selectedDeleteIngredient: {},
    selectedEditIngredient: {},
    filterParam: ""
  };

  handleListEditItemClick = (ingredient) => {
    //console.log("Clicked on",JSON.stringify(ingredient))
    this.setState({
      selectedEditIngredient: ingredient
    })
  };
  
  handleListItemClick = (ingredient) => this.props.onClick(ingredient)
  getIngredientFromArray = (id) => this.props.ingredients.filter((ing) => ing.id === id)[0].name
  getTagList = (ingredient) => ingredient?ingredient?this.props.ingredients.ingredients.filter((ing) => ingredient.includes(ing.id)).map((item) => item.name).toString():"":""
  deleteItem = (answer) => answer?this.props.deleteIngredient(this.state.selectedDeleteIngredient):  this.setState({ selectedDeleteIngredient: {} })
    
  render() {
    const { classes } = this.props;

    return (

      <div className={classes.root}>
        <Container>
          <Row>
            <Col style={{textAlign:"center"}}><h4>Ingredient List</h4></Col>
            </Row>
            <Row>
            <Col>
              
            </Col>
          </Row>
          <Row noGutters>
            <InputGroup style={{ marginBottom: "5px" }}>
            <InputGroupAddon addonType="prepend"><IngredientModal ingredient={this.state.selectedEditIngredient} color="primary" buttonLabel={<span><AddCircle/></span>} postIngredient={this.props.postIngredient} putIngredient={this.props.putIngredient} ingredients={this.props.ingredients} /></InputGroupAddon>
              <Input value={this.state.filterParam} onChange={(param) => this.setState({ filterParam: param.target.value })} aria-describedby="emailHelp" placeholder="Ingredient Search" />
              <InputGroupAddon addonType="append"><Button onClick={() => this.setState({ filterParam: "" })} color="danger">X</Button></InputGroupAddon>
            </InputGroup>
          </Row>
          <Row noGutters>
            <Col>
              <ConfirmDialog title="Confirm Delete Item?" handleAlertClose={(answer) => this.deleteItem(answer)} openOnStateChange={this.state.selectedDeleteIngredient} message={`Are you sure you want to delete '${this.state.selectedDeleteIngredient.name}'?`} agree="Delete" disagree="Don't Delete" agreeColor="secondary" disAgreeColor="primary" />
              <List component="nav" style={{ maxHeight: 360, overflow: 'auto', }}>
                {this.props.ingredients.ingredients.sort(compareByName).filter((ingredient) => ingredient.name.toLowerCase().includes(this.state.filterParam.toLowerCase())).map((ingredient) => {
                  return (<ListItem key={ingredient.id}
                    button
                    onClick={() => this.handleListItemClick(ingredient)}>
                    <ListItemText primary={ingredient.name} secondary={this.getTagList(ingredient.tags)} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={() => this.handleListEditItemClick(ingredient)} aria-label="Delete">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => this.setState({ selectedDeleteIngredient: ingredient })} aria-label="Delete">
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>)
                })}
              </List>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

FoodIngredientList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FoodIngredientList);