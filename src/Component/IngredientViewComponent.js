import React, { Component } from 'react'
import { Container, Row, Col, Label, Button } from 'reactstrap';
import { Control, Form, Errors, actions } from 'react-redux-form';
import FoodIngredientItems from './FoodIngredientItems'
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)



class IngredientView extends Component {

    handleAddIngredientSubmit(values) {
        if (values.id != null) {
            this.props.putIngredient(values)
        } else {
            this.props.postIngredient(values.name, values.tags)
        }
        this.props.resetAddIngredientForm();
    }

    editIngredient(ingredient) {
        console.log(JSON.stringify(ingredient))
        if (ingredient.tags == null) ingredient.tags = []
        this.props.dispatch(actions.change('addIngredient', ingredient))

    }

    removeTag(tag) {
        this.props.dispatch(actions.remove('addIngredient.tags', this.props.addIngredient.tags.findIndex((tagg)=>tagg.id===tag.id)))
    }

    addTag(tag) {
        this.props.dispatch(actions.push('addIngredient.tags', tag))
    }
    clickAsNewItem(){
        this.props.dispatch(actions.change('addIngredient.id'),'')
    }
    handleChipClick(tag) {
        const taglist = this.props.addIngredient.tags;
        if (this.props.addIngredient.tags != null) {
            
            if (taglist.some((tagg) => tagg.id === tag.id)) {
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
        const isTagAdded = (tag) => this.props.addIngredient.tags ? this.props.addIngredient.tags.some((tagg) => tagg.id === tag.id) ? true : false : false
        const isUpdating = this.props.addIngredient.id > -1 ? true : false
        return (
            <Container>
                <Row>
                    <Col className="border border-info rounded" sm={12} md={{ size: 5, offset: 1 }} >
                        Ingredients
                    <Row>
                            <Col><FoodIngredientItems resetForm={() => this.props.resetAddIngredientForm()} deleteIngredient={(ing) => this.props.deleteIngredient(ing)} editIngredient={(ing) => this.editIngredient(ing)} ingredients={this.props.ingredients.ingredients} isLoading={this.props.ingredients.isLoading} errMess={this.props.ingredients.errMess} /></Col>
                        </Row>
                    </Col>
                    <Col className="border border-info rounded" sm={12} md={{ size: 5, offset: 1 }} >
                        <div>{isUpdating ? "Update" : "New"} Ingredient</div>
                        <Form model="addIngredient" onSubmit={(values) => this.handleAddIngredientSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Ingredient Name</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Ingredient Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
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
                                <Col className="text-center">
                                    <Button color="primary">{isUpdating ? 'Update' : 'Add'}</Button><Button onClick={() => this.props.resetAddIngredientForm()} type="button" color="danger">Clear</Button>
                                    {isUpdating?<Button onClick={() => this.clickAsNewItem()} type="button" color="success">As New</Button>:<></>}
                                    </Col>
                            </Row>
                            <Row>
                                <Col>Ingredient Tags(Solid=Added)</Col>
                            </Row><Row>
                                <Col>
                                    {this.props.foodTags.foodTags.map((tag, idx) => {
                                        return (<Chip key={idx} label={tag.name} onClick={() => this.handleChipClick(tag)} color="primary" variant={isTagAdded(tag) ? "default" : "outlined"} />)
                                    })}
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
