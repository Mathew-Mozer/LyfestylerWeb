import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { withStyles } from '@material-ui/core/styles';
import LyfeStyleListItemComponent from './LyfeStyleListItemComponent'
import firebase from '../Firebase/firebase'
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import BarCodeReaderComponent from './BarcodeReaderComponent';

const styles = theme => ({
    fab: {
        position: 'absolute',
        bottom: (theme.spacing.unit * 2)-60,
        right: theme.spacing.unit * 2,
      },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    }
  });

class Home extends Component {
    
    state = {
        expandedItem: -1,
        lyfestyles:[]
    }
    renderLabel=(ingredient)=>{
        if(ingredient.factRestriction){
            return (`${ingredient.name} ${ingredient.greaterthan?'<':'>'} ${ingredient.value}${ingredient.measure}`)
        }else{
            return(ingredient.name)
        }
    }
    aggregateIngredient(){
        let restrictions=[];
        this.props.lyfestyles.lyfestyles.forEach((item)=>{
            if(item.restrictions&&item.active)
            item.restrictions.forEach((item)=>{
                if(item.factRestriction){
                    var itemId=restrictions.findIndex((itm)=>itm.id===item.id)
                    if(itemId>-1){
                        if(+restrictions[itemId].value>+item.value){
                            console.log("Replace",restrictions[itemId].value,"with",item.value)    
                            restrictions[itemId].value=item.value
                        }
                    }else{
                        restrictions.push(item)
                    }
                    
                }else{
                    restrictions=restrictions.some((itm)=>itm.id===item.id)?restrictions:restrictions.concat(item)
                }
                
            })
        })
        return(<>{restrictions.length>0?restrictions.map((ingredient)=><Chip color={ingredient.factRestriction?'secondary':'primary'} key={ingredient.id} label={this.renderLabel(ingredient)} />):<>You currently do not have any restrictions. Activate a lyfestyle to show your restrictions</>}</>)
    }

    componentDidMount(){
        this.getLyfeStyles()
        if(this.props.match.params.accessToken){
            const credential = firebase.auth.GoogleAuthProvider.credential(null, this.props.match.params.accessToken)
            firebase.auth().signInWithCredential(credential);
        }
    }

    getLyfeStyles(){
        var lyfestyles=[]
        firebase.firestore().collection("lyfestyles").where("public","==",true).get()
        .then(snapshot => {
            if (snapshot.empty) {
            return;
            }
            snapshot.forEach(doc => {
                if(!this.props.lyfestyles.lyfestyles.some((docid)=>doc.id===docid.id)){
                var tmp={id:doc.id,...doc.data()}
                lyfestyles.push(tmp)
                }
            });
            this.setState({lyfestyles:lyfestyles})
        })
        .catch(err => {
            console.log('Error getting documents', err);
        })
    }

     render() {
        const { classes } = this.props;
        if(!firebase.auth().currentUser){
            return(<div>   {this.props.match.params.idToken}
                {this.props.match.params.accessToken}<br></br>You aren't logged in</div>)
        }
        return (
                    <div>
                     
                <Container fluid>
                    <Row noGutters style={{margin:"5px"}}>
                        <Col className="border border-info rounded TileBorder" xs={{size:12,order:2}} md={{ size: 6,order:0 }} >
                            <Row><Col><h2>My Lyfestyles</h2></Col></Row>
                            <Row noGutters><Col style={{marginBottom:"50px"}}><List style={{ width: "100%",maxHeight: 250, overflow: 'auto'}}>
                               {!this.props.lyfestyles.isLoading?this.props.lyfestyles.lyfestyles.length>0?(
                                this.props.lyfestyles.lyfestyles.filter(itm=>!itm.managed).map((item) => {
                                    return (<LyfeStyleListItemComponent activeToggle editButton key={item.id} ItemDetails={item} expandedItem={this.state.expandedItem} onExpand={(itemId) => this.setState({ expandedItem: itemId })} />)
                                })):(
                                   <div>You aren't currently subscribed to any lyfestyles. Check out some public Lyfestyles to get started</div>     
                                ):<div>Loading</div>}
                            </List>
                            {<Fab color="primary" onClick={()=>this.props.history.push({ pathname: `/lyfestyleedit/` })} aria-label="Add" className={classes.fab}>
                                    <AddIcon />
                                  </Fab>}
                            </Col>
                            </Row>
                        </Col>
                        <Col className="border border-info rounded TileBorder" xs={{size:12,order:0}} md={{ size: 6,order:1 }}>
                            Current LyfeStyle Restrictions<br></br>
                            {this.aggregateIngredient()}
                            
                        </Col>
                        <Col className="border border-info rounded TileBorder" xs={{size:12,order:2}} md={{ size: 6,order:2 }} >
                            <Row><Col><h2>Public LyfeStyles</h2></Col></Row>
                            <Row><Col><List style={{ width: "100%",maxHeight: 250, overflow: 'auto'}}>
                                    {this.state.lyfestyles.length>0?this.state.lyfestyles.map((item)=>{
                                        return(<LyfeStyleListItemComponent subscribeButton key={item.id} ItemDetails={item}/>)
                                    }):<div>You're currently subscribed to everything. Enjoy drinking water and eating ice</div>}
                            </List>
                            </Col>
                            </Row>
                        </Col>
                        <Col className="border border-info rounded TileBorder" xs={{size:12,order:2}} md={{ size: 6,order:3 }} >
                        Scan Barcode
                        <BarCodeReaderComponent/>
                        </Col>
                    </Row>
                    
                </Container>
            </div>
        )
    }
}
Home.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withStyles(styles)(Home)