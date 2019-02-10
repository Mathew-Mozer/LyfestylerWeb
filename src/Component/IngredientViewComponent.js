import React, { Component } from 'react'
import { Container, Row, Col, Label } from 'reactstrap';
import Chip from '@material-ui/core/Chip';
import { Control, Form, Errors,reset } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

export default class IngredientView extends Component {

    handleDelete = () => {

    }

    handleAddIngredientSubmit(values) {
        this.props.postIngredient(values.name)
        this.props.resetAddIngredientForm();
    }

    render() {

        if (this.props.ingredients.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        Loading
                    </div>
                </div>
            );
        }
        else if (this.props.ingredients.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.leaders.errMess}</h4>
                    </div>
                </div>
            );
        } else {

            const renderIngredients = this.props.ingredients.ingredients.map((ingredient) => {
                return (
                    <Chip label={ingredient.name} onDelete={this.handleDelete} color="primary" variant="outlined" />
                );
            });

            return (
                <div>
                    <Container>
                        <Row>
                            <Col className="border border-info rounded" sm={12} md={{ size: 5, offset: 1 }} >
                                Ingredients
                                <Row>
                                    <Col> {renderIngredients}</Col>
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
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
    }
}

