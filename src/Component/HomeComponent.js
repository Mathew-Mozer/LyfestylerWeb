import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import LyfeStyleListItemComponent from './LyfeStyleListItemComponent'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';

    

class Home extends Component {
    state = {
        expandedItem: -1
    }
    aggregateIngredient(){
        let restrictions=[];

        this.props.lyfestyles.lyfestyles.forEach((item)=>{
            if(item.restrictions&&item.active)
            item.restrictions.forEach((item)=>{
                restrictions=restrictions.some((itm)=>itm.id===item.id)?restrictions:restrictions.concat(item)
            })
            //console.log("Restrictions",JSON.stringify(item.restrictions))
        })
        return(<>{restrictions.map((ingredient)=><Chip key={ingredient.id} label={ingredient.name} />)}</>)
    }

     render() {
        
        return (
            <div>
                <Container fluid>
                    <Row style={{margin:"5px"}}>
                        <Col className="border border-info rounded TileBorder" xs={{size:12,order:2}} md={{ size: 6,order:0 }} >
                            <Row><h2>My Lyfestyles</h2></Row>
                            <Row><List style={{ width: "100%",maxHeight: 250, overflow: 'auto'}}>
                               {!this.props.lyfestyles.isLoading?(
                                this.props.lyfestyles.lyfestyles.filter(itm=>!itm.managed).map((item) => {
                                    return (<LyfeStyleListItemComponent key={item.id} ItemDetails={item} expandedItem={this.state.expandedItem} onExpand={(itemId) => this.setState({ expandedItem: itemId })} />)
                                })):(
                                   <div>Loading</div>     
                                )}
                            </List>
                            </Row>
                            <Row>Search LyfeStyles:</Row>
                        </Col>
                        <Col className="border border-info rounded TileBorder" xs={{size:12,order:0}} md={{ size: 6,order:1 }}>
                            Current LyfeStyle Sensativities<br></br>
                                {this.aggregateIngredient()}
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Home