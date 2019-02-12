import React, { Component } from 'react'
import {Col,Row,Container, Button, InputGroup, InputGroupAddon, Input} from 'reactstrap'
import { Link } from 'react-router-dom'
import FoodIngredientItems from './newFoodIngredientItems'
import IngredientModal from './IngredientModal';

export default class DietEdit extends Component{
    state={
        ingredientSearch:""
    }
    render(){
        return(
            <Container>
                <Col className="border border-info rounded Add-Gutter" sm={4} md={{ size: 4, offset: 1 }} >
                        <Row>
                            <Col>
                                <label for="exampleInputEmail1">Ingredients
                                </label>
                                <Link label="test" style={{paddingLeft:"15px",textDecoration:'none'}} to={`/ingredients`} >Edit Ingredients</Link>                                
                                <InputGroup style={{ marginBottom: "5px" }}>
                                    <Input value={this.state.ingredientSearch} onChange={(param) => this.setState({ ingredientSearch: param.target.value })} aria-describedby="emailHelp" placeholder="Ingredient Tag Search" />
                                    <InputGroupAddon addonType="append"><Button onClick={() => this.setState({ ingredientSearch: "" })} color="danger">X</Button></InputGroupAddon>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col><FoodIngredientItems filterParam={this.state.ingredientSearch} resetForm={() => this.props.resetAddIngredientForm()} deleteIngredient={(ing) => this.props.deleteIngredient(ing)} editIngredient={(ing) => this.editIngredient(ing)} ingredients={this.props.ingredients.ingredients} isLoading={this.props.ingredients.isLoading} errMess={this.props.ingredients.errMess} /></Col>
                        </Row>
                        <Row>
                            
                            <IngredientModal buttonLabel="EditIngredients" ingredients={this.props.ingredients}/>
                        </Row>
                    </Col>
            </Container>
        )
    }
}