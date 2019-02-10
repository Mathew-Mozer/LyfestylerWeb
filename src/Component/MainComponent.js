import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import WoeViewer from './WOEViewer'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { fetchDiets, fetchItems } from '../redux/ActionCreators'
import { connect } from 'react-redux';
import {Diets,Items} from '../shared/data';
import ItemViewer from './ItemViewComponent';

const mapStateToProps = state => {
    return {
      diets: state.diets,
      items: state.items,
    }   
}

const mapDispatchToProps = (dispatch) => ({
    fetchDiets: () => {dispatch(fetchDiets())},
    fetchItems: () => {dispatch(fetchItems())},
  })

class Main extends Component {

    componentDidMount(){
        this.props.fetchDiets();
        this.props.fetchItems();
      }

    render() {
        const HomePage = () => {
            return (
                <Home />
            )
        }
        const DietWithId = ({match}) => <WoeViewer diet={Diets.filter((diet) => diet.id===parseInt(match.params.dietId,10))[0]}/>
        const scanItem = ({match}) => <ItemViewer item={Items.filter((item) => item.UPC==parseInt(match.params.upc,10))[0]}/>
        return (
            <div>
                <Header diets={Diets}/>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/woe/:dietId" component={DietWithId}/>            
                    <Route path="/scan/:upc" component={scanItem}/>            
                    <Redirect to="/home" />
                </Switch>

                
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));