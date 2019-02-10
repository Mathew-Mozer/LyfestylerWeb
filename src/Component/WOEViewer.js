import React, { Component }  from 'react'
import { FoodIngredient } from './FoodItemViews'
import { Container,Row,Col } from 'reactstrap'

export default class WoeViewer extends Component {
    constructor(props){
        super(props);
        
    }

    render(){
        return(<Container>
            <Row>
                <Col sm={12} md={12}><h1>{this.props.diet.name}</h1>
                    <Row>
            {this.props.diet.restrictions.map((FoodItem)=>{
                return(FoodIngredient(FoodItem))
            })}
                    </Row>
            </Col>
            </Row>
        </Container>)
    }
}