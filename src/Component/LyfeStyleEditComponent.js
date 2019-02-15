import React, { Component } from 'react'
import {Col,Row,Container, Label} from 'reactstrap'
import { Control, Form, Errors, actions} from 'react-redux-form';
import { connect } from 'react-redux';
import FoodIngredientList from './FoodIngredientList'
import Chip from '@material-ui/core/Chip';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

class LyfeStyleEdit extends Component{
    state={
        ingredientSearch:"",
        selectedItem:null
    }
    isIngredientAdded = ({id}) =>this.props.formLyfeStyleEditor.restrictions? this.props.formLyfeStyleEditor.restrictions.some((tagg) => tagg.id === id) ? true : false : false
    handleformLyfeStyleEditor(values) {
        values.id?this.props.putLyfeStyle(values):this.props.postLyfeStyle(values)
        this.setState({ingredientSearch: ""})
    }
    
    handleAddIngredient=ingredient=>{
      if(!this.isIngredientAdded(ingredient)){
        this.props.dispatch(actions.push('formLyfeStyleEditor.restrictions', ingredient))
      }else{
        
      }
        
    }
    
    render(){
        return(
            <Container fluid>
            <Row>
                 <Col className="border border-info rounded Add-Gutter" style={{padding:"10px 0px 10px 0px"}} sm={4} md={{ size: 5 }} >
                 <Form model="formLyfeStyleEditor" onSubmit={(values) => this.handleformLyfeStyleEditor(values)}>
                 <Row className="form-group">
                                <Label htmlFor="name" md={2}>Name</Label>
                                <Col md={10}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="LyfeStyle Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(25)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required. ',
                                            minLength: 'Must be greater than 2 characters.',
                                            maxLength: 'Must be 15 characters or less.'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                        <Col md="12" >Restrictions:</Col>
                                <Col style={{overflow:"auto",maxHeight:"200px"}}>
                                {this.props.formLyfeStyleEditor.restrictions.map(restriction=>{
                                    return(<Chip key={restriction.id} label={restriction.name} />)
                                })                                   
                                }
                                </Col>
                            </Row>
                        </Form>
                 </Col>
                 <Col className="border border-info rounded Add-Gutter" style={{padding:"10px 0px 10px 0px"}} sm={4} md={{ size: 5 }} >
                        <Row noGutters>
                            <Col><FoodIngredientList onClick={(item)=>this.handleAddIngredient(item)} ingredients={this.props.ingredients}  isLoading={this.props.ingredients.isLoading} errMess={this.props.ingredients.errMess} postIngredient={this.props.postIngredient} putIngredient={this.props.putIngredient} deleteIngredient={this.props.deleteIngredient}/></Col>
                        </Row>
                 </Col>
                 </Row>
            </Container>
        )
    }
}
export default connect(({ formLyfeStyleEditor }) => ({ formLyfeStyleEditor }))(LyfeStyleEdit)