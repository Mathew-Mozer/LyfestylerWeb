import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import WoeViewer from './WOEViewer'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { fetchLyfeStyles, fetchItems,fetchIngredients,postIngredient,fetchFoodTags,putIngredient,deleteIngredient, putLyfeStyle,postLyfeStyle } from '../redux/ActionCreators'
import { connect } from 'react-redux';
import ItemViewer from './ItemViewComponent';
import LyfeStyleEdit from './LyfeStyleEditComponent';

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
    putLyfeStyle: (lyfestyle) => dispatch(putLyfeStyle(lyfestyle)),
    postLyfeStyle: (lyfestyle) => dispatch(postLyfeStyle(lyfestyle)),
    deleteIngredient: (ingredient) => dispatch(deleteIngredient(ingredient)),
    fetchLyfeStyles: () => {dispatch(fetchLyfeStyles())},
    fetchItems: () => {dispatch(fetchItems())},
    fetchIngredients: () => {dispatch(fetchIngredients())},
    fetchFoodTags: () => {dispatch(fetchFoodTags())}
  })

class Main extends Component {

    componentDidMount(){
        this.props.fetchLyfeStyles();
        this.props.fetchItems();
        this.props.fetchIngredients();
        this.props.fetchFoodTags();
      }
    render() {

        const LyfeStyleWithId = ({match}) => <WoeViewer LyfeStyle={this.props.LyfeStyles.filter((LyfeStyle) => LyfeStyle.id===parseInt(match.params.LyfeStyleId,10))[0]}/>
        const scanItem = ({match}) => <ItemViewer item={this.props.LyfeStyle.filter((item) => item.UPC==parseInt(match.params.upc,10))[0]}/>

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/home" render={()=><Home lyfestyles={this.props.lyfestyles} ingredients={this.props.ingredients}/>} />
                    <Route exact path="/lyfestyleedit" render={()=><LyfeStyleEdit editLyfeStyle={this.props.editLyfeStyle} deleteLyfeStyle={this.props.deleteLyfeStyle} postLyfeStyle={this.props.postLyfeStyle} putLyfeStyle={this.props.putLyfeStyle} ingredients={this.props.ingredients} />} />
                    <Route path="/woe/:LyfeStyleId" component={LyfeStyleWithId}/>            
                    <Route path="/scan/:upc" component={scanItem}/>            
                    <Redirect to="/home" />
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));