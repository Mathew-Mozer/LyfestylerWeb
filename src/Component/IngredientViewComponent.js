import React, { Component } from 'react'
import { Container, Row, Col, Label } from 'reactstrap';
import { Control, Form, Errors,actions } from 'react-redux-form';
import FoodIngredientItems from './FoodIngredientItems'
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)



class IngredientView extends Component {

    handleAddIngredientSubmit(values) {
        this.props.postIngredient(values.name,values.tags)
        this.props.resetAddIngredientForm();
    }

    render(){
        const initialMember = { firstName: '', lastName: '' };
        return(
            <Container>
            <Row>
                <Col className="border border-info rounded" sm={12} md={{ size: 5, offset: 1 }} >
                    Ingredients
                    <Row>
                        <Col><FoodIngredientItems ingredients={this.props.ingredients.ingredients} isLoading={this.props.ingredients.isLoading} errMess={this.props.ingredients.errMess}/></Col>
                    </Row>
                </Col>
                <Col className="border border-info rounded" sm={12} md={{ size: 5, offset: 1 }} >
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
                                    <Col>Ingredient Tags(Solid=Added)</Col>
                                </Row><Row>
                                    <Col>
                                      {this.props.foodTags.foodTags.map((tag)=>{
                                          return(<Chip label={tag.name} onClick={() => this.props.dispatch(actions.push('addIngredient.tags', tag))} color="primary" variant={this.props.addIngredient.tags.includes(tag)? "default":"outlined"} />)
                                      })}
                                      {console.log("Current Food Tags",JSON.stringify(this.props.addIngredient.tags))}
                                    </Col>
                                </Row>
                              
                            </Form>
                        </Col>
            </Row>
            </Container>
        )
    }
}

export default connect(({addIngredient}) => ({addIngredient}))(IngredientView)
