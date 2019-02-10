import React from 'react'
import Chip from '@material-ui/core/Chip';

export default function FoodIngredientItems(props){
    const handleDelete = () => {

    }
    if (props.isLoading) {
        
        return (
            <div className="container">
                <div className="row">
                    Loading
                </div>
            </div>
        );
    }else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }else {
        const tmp = props.ingredients.map((ingredient) => {
            return (
                <Chip label={ingredient.name} onDelete={handleDelete} color="primary" variant="outlined" />
            );
        });
        return(tmp)
    }
}