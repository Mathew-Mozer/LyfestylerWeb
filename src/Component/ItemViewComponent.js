import React, { Component }  from 'react'
import { Container,Row,Col } from 'reactstrap'

export default class ItemViewer extends Component {
    constructor(props){
        super(props);
        
    }

    render(){
        //alert(JSON.stringify(this.props))
        return(<Container>
            <Row>
                <Col sm={12} md={12}><h1>{this.props.item.Name}</h1>
            </Col>
            <Col>
         
            
            </Col>
            </Row>
        </Container>)
    }
}