import React, { Component } from 'react'
import {Col,Row,Container} from 'reactstrap'
import FoodIngredientList from './FoodIngredientList'

export default class DietEdit extends Component{
    state={
        ingredientSearch:"",
        selectedItem:null
    }
    
    render(){
        return(
            <Container>
                <Col className="border border-info rounded Add-Gutter" style={{padding:"10px 0px 10px 0px",}} sm={4} md={{ size: 4, offset: 1 }} >
                        <Row noGutters>
                            <Col><FoodIngredientList onClick={(item)=>alert(`Clicked: ${item.name}`)} ingredients={this.props.ingredients.ingredients} isLoading={this.props.ingredients.isLoading} errMess={this.props.ingredients.errMess} /></Col>
                        </Row>
                    </Col>
            </Container>
        )
    }
}