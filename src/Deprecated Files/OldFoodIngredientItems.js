import React, { Component } from 'react'
import { Container,Row,Col }  from 'reactstrap'
import Chip from '@material-ui/core/Chip';
import { compareByName } from '../shared/sortTools'
import ConfirmDialog from '../Component/ConfirmDialog'

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
            const ingredientChips = this.props.ingredients.sort(compareByName).filter((ingredient)=>ingredient.name.toLowerCase().includes(this.props.filterParam.toLowerCase())).map((ingredient) =><Chip label={ingredient.name} onClick={() => handleClick(ingredient)} onDelete={() => handleDelete(ingredient)} color="primary" variant="outlined" />);
            return (
                <>
                <Container>
                    <Row>
                        <Col><ConfirmDialog title="Confirm Delete Item?" message={`Are you sure you want to delete '${this.state.selectedIngredient.name}'?`} handleAlertClose={(tmp)=>handleAlertClose(tmp)} isOpen={this.state.isConfirmOpen} agree="Delete" disagree="Don't Delete" agreeColor="secondary" disAgreeColor="primary"/>
                            {ingredientChips}           
                        </Col>
                    </Row>
                </Container>
                
                
                </>
                )
        }
    }
}