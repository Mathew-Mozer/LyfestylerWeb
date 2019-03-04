import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import WoeViewer from './WOEViewer'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { fetchLyfeStyles, fetchItems,fetchIngredients,postIngredient,fetchFoodTags,putIngredient,deleteIngredient, addLyfeStyle,updateLyfeStyle } from '../redux/ActionCreators'
import { connect } from 'react-redux';
import ItemViewer from './ItemViewComponent';
import LyfeStyleEdit from './LyfeStyleEditComponent';
import firebase from '../Firebase/firebase'

const mapStateToProps = state => {
    return {
      lyfestyles: state.lyfestyles,
      items: state.items,
      ingredients: state.ingredients,
      foodTags: state.foodTags
    }   
}

const mapDispatchToProps = (dispatch) => ({
    postIngredient: (id,name,tags) => dispatch(postIngredient(id,name,tags)),
    putIngredient: (ingredient) => dispatch(putIngredient(ingredient)),
    addLyfeStyle: (lyfestyle) => dispatch(addLyfeStyle(lyfestyle)),
    updateLyfeStyle: (lyfestyle) => dispatch(updateLyfeStyle(lyfestyle)),
    deleteIngredient: (ingredient) => dispatch(deleteIngredient(ingredient)),
    fetchLyfeStyles: () => {dispatch(fetchLyfeStyles())},
    fetchIngredients: () => {dispatch(fetchIngredients())},
  })

class Main extends Component {
    state={
        isNative:false
    }

    componentDidMount(){
        const userChanged = firebase.auth().onAuthStateChanged(authUser => {
            if(authUser){
                this.setState({ authUser })
                this.props.fetchLyfeStyles();
                if(firebase.auth().currentUser)
                this.props.fetchIngredients();
            }else{
                this.setState({ authUser: null })
            }
        })
        
      }
      LyfeStyleWithId = ({match}) => <WoeViewer LyfeStyle={this.props.LyfeStyles.filter((LyfeStyle) => LyfeStyle.id===parseInt(match.params.LyfeStyleId,10))[0]}/>
      scanItem = ({match}) => <ItemViewer ingredients={this.props.ingredients} allergies={this.aggrigatedAllergies()} upc={match.params.upc} type={match.params.type} lyfestyles={this.props.lyfestyles}/>
      aggrigatedAllergies = ()=> {
        const allergies = []
        console.log("Aggregate is changing")
        if(!this.props.lyfestyles.isLoading){
            this.props.lyfestyles.lyfestyles.filter((ls)=>ls.active).map((ls)=>{
                ls.restrictions.map((rs)=>{
                    allergies.push(rs.name.toLowerCase())
                    rs.tags.map((tag)=>{
                        var tmp = this.props.ingredients.ingredients.filter((item)=>item.id===tag)
                        if(tmp.length>0)
                        allergies.push(tmp[0].name)
                    })
                })
                
            })
        }
        return(allergies)
      }
    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/home/:accessToken?" render={(props)=><Home {...props} lyfestyles={this.props.lyfestyles} ingredients={this.props.ingredients}/>} />
                    <Route path="/lyfestyleedit/:LyfeStyleId?" render={(props)=><LyfeStyleEdit {...props} editLyfeStyle={this.props.editLyfeStyle} deleteLyfeStyle={this.props.deleteLyfeStyle} postLyfeStyle={this.props.addLyfeStyle} putLyfeStyle={this.props.updateLyfeStyle} fetchIngredients="duh" ingredients={this.props.ingredients} />} />
                    <Route path="/woe/:LyfeStyleId" component={this.LyfeStyleWithId}/>
                    <Route path="/scan/:upc?/:type?" component={this.scanItem}/>            
                    <Redirect to="/home" />
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));