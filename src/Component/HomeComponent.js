import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import LyfeStyleListItemComponent from './LyfeStyleListItemComponent'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';

class Home extends Component {
    state = {
        expandedItem: -1
    }

    managedLyfeStyles = [
        { id: 0, name: "Candida Protocol",manager:"Dr. Tam McDonald" }, { id: 1, name: "Mathew Mozer Sensitivities",manager:'Dr. Tam McDonald' }, { id: 2, name: "Dirty Keto" }, { id: 3, name: "No Fermented" }, { id: 4, name: "Gluten Free",manager:'Dr. Jean-Roberto Don' }
    ]
    unManagedLyfeStyles = [
        { id: 0, name: "Keto",createdBy:"Keto Guy" }, { id: 1, name: "Dirty Keto",createdBy:"Keto Guy" }, { id: 2, name: "Dirty Keto",createdBy:"Keto Guy" }, { id: 3, name: "Keto1",createdBy:"Keto Guy" }, { id: 4, name: "Dirty Keto2",createdBy:"Keto Guy" }, { id: 5, name: "Dirty Keto3",createdBy:"Keto Guy" }
    ]

    render() {
        console.log("expandedItem", this.state.expandedItem)
        return (
            <div>
                <Container fluid>
                    <Row style={{margin:"5px"}}>
                        <Col className="border border-info rounded TileBorder" xs={{size:12,order:1}} md={{ size: 6 }} >
                            <Row><h2>Managed Lyfestyles</h2></Row>
                            <Row><List style={{ width: "100%",maxHeight: 250, overflow: 'auto'}}>
                            {!this.props.lyfestyles.isLoading?(
                                this.props.lyfestyles.lyfestyles.filter(itm=>itm.managed===true).map((item) => {
                                    return (<LyfeStyleListItemComponent ItemDetails={item} expandedItem={this.state.expandedItem} onExpand={(itemId) => this.setState({ expandedItem: itemId })} />)
                                })):(
                                    <div>Loading</div>     
                                 )}
                            </List>
                            </Row>
                        </Col>
                        <Col className="border border-info rounded TileBorder" xs={{size:12,order:2}} md={{ size: 6,order:2 }} >
                            <Row><h2>Personally Lyfestyles</h2></Row>
                            <Row><List style={{ width: "100%",maxHeight: 250, overflow: 'auto'}}>
                               {!this.props.lyfestyles.isLoading?(
                                this.props.lyfestyles.lyfestyles.filter(itm=>itm.managed===false).map((item) => {
                                    return (<LyfeStyleListItemComponent ItemDetails={item} expandedItem={this.state.expandedItem} onExpand={(itemId) => this.setState({ expandedItem: itemId })} />)
                                })):(
                                   <div>Loading</div>     
                                )}
                            </List>
                            </Row>
                            <Row>Search LyfeStyles:</Row>
                        </Col>
                        <Col className="border border-info rounded TileBorder" xs={{size:12,order:3}} md={{ size: 6,order:3 }}>
                            Admin Links<br></br>
                            <Link to={`/lyfestyleedit`}>Edit Diets</Link>
                        </Col>
                        <Col className="border border-info rounded TileBorder" xs={{size:12,order:0}} md={{ size: 6,order:1 }}>
                            Current LyfeStyle<br></br>
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Home