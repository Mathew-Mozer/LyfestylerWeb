import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import LyfeStyleListItemComponent from './LyfeStyleListItemComponent'
import firebase from '../Firebase/firebase'
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';

    

class Home extends Component {
    state = {
        expandedItem: -1,
        lyfestyles:[]
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

    componentDidMount(){
        this.getLyfeStyles()
    }

    getLyfeStyles(){
        var lyfestyles=[]
        firebase.firestore().collection("lyfestyles").where("public","==",true).get()
        .then(snapshot => {
            if (snapshot.empty) {
            console.log('No matching documents.');
            return;
            }
            snapshot.forEach(doc => {
                var tmp={id:doc.id,...doc.data()}
                lyfestyles.push(tmp)
                console.log("getting LyfeStyle:",JSON.stringify(tmp))
            });
            this.setState({lyfestyles:lyfestyles})
        })
        .catch(err => {
            console.log('Error getting documents', err);
        })
    }

     render() {
        if(!firebase.auth().currentUser){
            return(<div>You aren't logged in</div>)
        }
        return (
            <div>
                <Container fluid>
                    <Row style={{margin:"5px"}}>
                        <Col className="border border-info rounded TileBorder" xs={{size:12,order:2}} md={{ size: 6,order:0 }} >
                            <Row><h2>My Lyfestyles</h2></Row>
                            <Row><List style={{ width: "100%",maxHeight: 250, overflow: 'auto'}}>
                               {!this.props.lyfestyles.isLoading?(
                                this.props.lyfestyles.lyfestyles.filter(itm=>!itm.managed).map((item) => {
                                    return (<LyfeStyleListItemComponent activeToggle editButton key={item.id} ItemDetails={item} expandedItem={this.state.expandedItem} onExpand={(itemId) => this.setState({ expandedItem: itemId })} />)
                                })):(
                                   <div>Loading</div>     
                                )}
                            </List>
                            </Row>
                        </Col>
                        <Col className="border border-info rounded TileBorder" xs={{size:12,order:0}} md={{ size: 6,order:1 }}>
                            Current LyfeStyle Sensativities<br></br>
                                {this.aggregateIngredient()}
                            
                        </Col>
                        <Col className="border border-info rounded TileBorder" xs={{size:12,order:2}} md={{ size: 6,order:2 }} >
                            <Row><h2>Public LyfeStyles</h2></Row>
                            <Row><List style={{ width: "100%",maxHeight: 250, overflow: 'auto'}}>
                                    {this.state.lyfestyles.map((item)=>{
                                        return(<LyfeStyleListItemComponent subscribeButton key={item.id} ItemDetails={item}/>)
                                    })}
                            </List>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Home