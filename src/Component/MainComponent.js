import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import WoeViewer from './WOEViewer'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { fetchDiets, fetchItems,fetchIngredients,postIngredient,fetchFoodTags } from '../redux/ActionCreators'
import { connect } from 'react-redux';
import {Diets,Items} from '../shared/data';
import ItemViewer from './ItemViewComponent';
import IngredientViewer from './IngredientViewComponent'
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
    return {
      diets: state.diets,
      items: state.items,
      ingredients: state.ingredients
    }   
}

const mapDispatchToProps = (dispatch) => ({
    postIngredient: (name) => dispatch(postIngredient(name)),
    fetchDiets: () => {dispatch(fetchDiets())},
    fetchItems: () => {dispatch(fetchItems())},
    fetchIngredients: () => {dispatch(fetchIngredients())},
    fetchFoodTags: () => {dispatch(fetchFoodTags())},
    resetAddIngredientForm: () => { dispatch(actions.reset('addIngredient'))}
  })

class Main extends Component {

    componentDidMount(){
        this.props.fetchDiets();
        this.props.fetchItems();
        this.props.fetchIngredients();
        this.props.fetchFoodTags();
      }

    render() {

        const DietWithId = ({match}) => <WoeViewer diet={Diets.filter((diet) => diet.id===parseInt(match.params.dietId,10))[0]}/>
        const scanItem = ({match}) => <ItemViewer item={Items.filter((item) => item.UPC==parseInt(match.params.upc,10))[0]}/>

        return (
            <div>
                <Header diets={Diets}/>
                <Switch>
                    <Route path="/home" render={()=><Home/>} />
                    <Route exact path="/ingredients" render={()=><IngredientViewer postIngredient={this.props.postIngredient} resetAddIngredientForm={this.props.resetAddIngredientForm} ingredients={this.props.ingredients} />} />
                    <Route path="/woe/:dietId" component={DietWithId}/>            
                    <Route path="/scan/:upc" component={scanItem}/>            
                    <Redirect to="/home" />
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));