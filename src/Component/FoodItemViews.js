import React from 'react'
import { Col, Row,Button } from 'reactstrap'

export const FoodIngredient = (ItemDetails) => {
    const renderRow = (itemName,itemDetail) =>{
        return(<Row style={{ paddingLeft: 25}}>
            <Col>{itemName}</Col>
            <Col>{itemDetail}</Col>
        </Row>)
    }

    return (
        <Col md={4}>
            <Row className="border border-info rounded">
                <Col xs={10} sm={9} md={10} lg={10}>
                    {ItemDetails.name}
                    {ItemDetails.carbMax ? renderRow("Carb Max",ItemDetails.carbMax):<></>}
                </Col>
                <Col xs={2} sm={2} md={2} lg={2}>
                        <Button style={{margin:"10px"}} className='btn-sm btn-danger' danger>X</Button>
                </Col>
            </Row>
        </Col>
    )
}