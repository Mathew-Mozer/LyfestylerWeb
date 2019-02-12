import React, { Component } from 'react'
import { Container,Row,Col } from 'reactstrap';
import {Link} from 'react-router-dom'
export default class Home extends Component{

    render(){
        return(
            <div>
            <Container>
                <Row>
                    <Col className="border border-info rounded" sm={12} md={{size:5,offset:1}} >Scan Food Item</Col>
                    <Col className="border border-info rounded" sm={12} md={{size:5,offset:1}}>
                    <Link to={`/ingredients`} activeClassName="active">Edit Ingredients</Link><br></br>
                    <Link to={`/dietedit`}>Edit Diets</Link>
                    </Col>
                </Row>
            </Container>
            </div>
        )
    }
}