import React, { Component } from 'react'
import Chip from '@material-ui/core/Chip';
import { compareByName } from '../shared/sortTools'
import ConfirmDialog from './ConfirmDialog'

export default class FoodIngredientItems extends Component {
    state={
        isConfirmOpen:false,
        selectedIngredient:{}
    }
    render() {
        const handleDelete = (ingredient) => {
            this.setState({
                isConfirmOpen:true,
                selectedIngredient:ingredient
            })
            
        }
        const handleAlertClose = (answer) => {
            this.setState({
                    isConfirmOpen:false
            })

            if(answer){
                this.props.deleteIngredient(this.state.selectedIngredient);
                this.props.resetForm();
            }
            
        }
        const handleClick = (ingredient) => {
            //alert(JSON.stringify())
            this.props.editIngredient(ingredient)
        }
        
        if (this.props.isLoading) {

            return (
                <div className="container">
                    <div className="row">
                        Loading
                </div>
                </div>
            );
        } else if (this.props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        } else {
            const ingredientChips = this.props.ingredients.sort(compareByName).map((ingredient) =><Chip label={ingredient.name} onClick={() => handleClick(ingredient)} onDelete={() => handleDelete(ingredient)} color="primary" variant="outlined" />);
            return (
                <>
                <ConfirmDialog title="Confirm Delete Item?" message={`Are you sure you want to delete '${this.state.selectedIngredient.name}'?`} handleAlertClose={(tmp)=>handleAlertClose(tmp)} isOpen={this.state.isConfirmOpen} agree="Delete" disagree="Don't Delete" agreeColor="secondary" disAgreeColor="primary"/>
                {ingredientChips}
                </>
                )
        }
    }
}