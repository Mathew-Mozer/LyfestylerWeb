import React, { Component } from 'react'
import { Container, Row, Col, Label, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
import FoodIngredientItems from './newFoodIngredientItems'
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)



class IngredientView extends Component {

    state = {
        ingredientSearch: "",
        tagSearch: ""
    }

    handleAddIngredientSubmit(values) {
        if (values.id != null) {
            this.props.putIngredient(values)
        } else {
            this.props.postIngredient(values.name, values.tags)
        }
        this.props.resetAddIngredientForm();
        this.setState({
            ingredientSearch: "",
            tagSearch: ""
        })
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
        return (
            <Container fluid>
                <Row>
                    <Col className="border border-info rounded Add-Gutter" sm={4} md={{ size: 2, offset: 1 }} >
                        <Row>
                            <Col>
                                <label for="exampleInputEmail1">Ingredients</label>
                                <InputGroup style={{ marginBottom: "5px" }}>
                                    <Input value={this.state.ingredientSearch} onChange={(param) => this.setState({ ingredientSearch: param.target.value })} aria-describedby="emailHelp" placeholder="Ingredient Tag Search" />
                                    <InputGroupAddon addonType="append"><Button onClick={() => this.setState({ ingredientSearch: "" })} color="danger">X</Button></InputGroupAddon>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col><FoodIngredientItems filterParam={this.state.ingredientSearch} resetForm={() => this.props.resetAddIngredientForm()} deleteIngredient={(ing) => this.props.deleteIngredient(ing)} editIngredient={(ing) => this.editIngredient(ing)} ingredients={this.props.ingredients.ingredients} isLoading={this.props.ingredients.isLoading} errMess={this.props.ingredients.errMess} /></Col>
                        </Row>
                    </Col>
                    <Col className="border border-info rounded Add-Gutter" sm={7} md={{ size: 8 }} >
                        <div>{isUpdating ? "Update" : "New"} Ingredient</div>
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

                                <Col>
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
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect(({ addIngredient }) => ({ addIngredient }))(IngredientView)
