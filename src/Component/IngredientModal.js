import React from 'react';
import { Container, Row, Col, Label, InputGroup, InputGroupAddon, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

class IngredientModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      tagSearch:""
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  editIngredient(ingredient) {
    console.log(JSON.stringify(ingredient))
    if (ingredient.tags == null) ingredient.tags = []
    this.props.dispatch(actions.change('addIngredient', ingredient))
}

removeTag(tag) {
    this.props.dispatch(actions.remove('addIngredient.tags', this.props.addIngredient.tags.findIndex((tagg) => tagg.id === tag.id)))
}

addTag(tag) {
    this.props.dispatch(actions.push('addIngredient.tags', tag.id))
}
clickAsNewItem() {
    this.props.dispatch(actions.change('addIngredient.id'), '')
}

  handleChipClick(tag) {
    const taglist = this.props.addIngredient.tags;
    if (this.props.addIngredient.tags != null) {

        if (taglist.some((tagg) => tagg === tag.id)) {
            this.removeTag(tag)
        } else {
            this.addTag(tag)
        }
    } else {
        alert('IS null')
    }
    //this.props.addIngredient.tags.some((tagToCheck)=>{console.log(tagToCheck.name)})(tag)?()=>this.removeTag(tag): () => this.addTag(tag)}
}

  render() {
    const isTagAdded = ({id}) =>this.props.addIngredient.tags ? this.props.addIngredient.tags.some((tagg) => tagg === id) ? true : false : false
    const isUpdating = this.props.addIngredient.id > -1 ? true : false
    console.log("Current Ingredients"+JSON.stringify(this.props.ingredients))
    if(!this.props.ingredients.isLoading)
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <Container>
          <Form model="addIngredient" onSubmit={(values) => this.handleAddIngredientSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Ingredient Name</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Ingredient Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(25)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required. ',
                                            minLength: 'Must be greater than 2 characters.',
                                            maxLength: 'Must be 15 characters or less.'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>Ingredient Tags(Solid=Added)</Col>
                            </Row>
                            <Row>
                                <Col>

                                    <InputGroup style={{ marginBottom: "5px" }}>
                                        <Input onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} value={this.state.tagSearch} onChange={(param) => this.setState({ tagSearch: param.target.value })} aria-describedby="emailHelp" placeholder="Ingredient Tag Search" />
                                        <InputGroupAddon addonType="append"><Button onClick={() => this.setState({ tagSearch: "" })} color="danger">X</Button></InputGroupAddon>
                                    </InputGroup>
                                </Col>

                            </Row>
                            <Row>
                                <Col style={{overflow:"auto",maxHeight:"200px"}}>
                                {console.log("TO:",JSON.stringify(this.props.ingredients.ingredients))}
                                {this.props.ingredients.ingredients.filter((ingredient) => ingredient.name.toLowerCase().includes(this.state.tagSearch.toLowerCase())).map((tag, idx) => {
                                        return (<Chip key={idx} label={tag.name} onClick={() => this.handleChipClick(tag)} color="primary" variant={isTagAdded(tag) ? "default" : "outlined"} />)
                                    })}
                                </Col>
                            </Row>
                            <Row>
                                <Col className="text-center">
                                    <Button color="primary">{isUpdating ? 'Update' : 'Add'}</Button><Button onClick={() => this.props.resetAddIngredientForm()} type="button" color="danger">Clear</Button>
                                    {isUpdating ? <Button onClick={() => this.clickAsNewItem()} type="button" color="success">Copy To New</Button> : <></>}
                                </Col>
                            </Row>
                        </Form>
                        </Container>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
    return(<div></div>)
  }
}

export default connect(({ addIngredient }) => ({ addIngredient }))(IngredientModal);