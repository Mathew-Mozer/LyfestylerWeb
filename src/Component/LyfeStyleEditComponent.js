import React, { Component } from 'react'
import { Col, Row, Container, Label,Button } from 'reactstrap'
import { Control, Form, Errors, actions, Field } from 'react-redux-form';
import { connect } from 'react-redux';
import Chip from '@material-ui/core/Chip';
import firebase from '../Firebase/firebase'
import Switch from '@material-ui/core/Switch';
import RestrictionTabsComponent from './RestrictionTabsComponent';
import ViewSubscribers from './ViewSubscribers'

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len)
const minLength = (len) => (val) => (val) && (val.length >= len)

class LyfeStyleEdit extends Component {

    state = {
        ingredientSearch: "",
        selectedItem: null,
        isPublic: false,
        isUpdating:false,
        canEdit:false,
        data:{name:""}
    }

    isIngredientAdded = ({ id }) => this.props.formLyfeStyleEditor.restrictions ? this.props.formLyfeStyleEditor.restrictions.some((tagg) => tagg.id === id) ? true : false : false
    handleformLyfeStyleEditor(values) {
        values.id ? this.props.putLyfeStyle(values) : this.props.postLyfeStyle(values)
        this.setState({ ingredientSearch: "" })
        let { history } = this.props;
        history.push({ pathname: `/home` });
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        return{ isPublic:nextProps.formLyfeStyleEditor.public?true:false,
            isUpdating:nextProps.formLyfeStyleEditor.id?true:false,
            canEdit:nextProps.subscription?nextProps.subscription.subscription.write:false    
        }
        
    }

    handleAddIngredient = ingredient => {
        if (!this.isIngredientAdded(ingredient)) {
            this.props.dispatch(actions.push('formLyfeStyleEditor.restrictions', ingredient))
        } else {
            this.props.dispatch(actions.remove('formLyfeStyleEditor.restrictions', this.props.formLyfeStyleEditor.restrictions.findIndex((item)=>item.id===ingredient.id)))
            this.props.dispatch(actions.push('formLyfeStyleEditor.restrictions', ingredient))
            
        }
    }
    handleDelete = ingredient => {
        if (this.isIngredientAdded(ingredient)) {
            this.props.dispatch(actions.remove('formLyfeStyleEditor.restrictions', this.props.formLyfeStyleEditor.restrictions.findIndex((item)=>item.id===ingredient.id)))
        }
    }

    componentDidMount() {
        if(this.props.match.params.LyfeStyleId){
        const docRef = firebase.firestore().collection("lyfestyles").doc(this.props.match.params.LyfeStyleId)
        docRef.get().then((snapshot) => {
            let data = snapshot.data();
            this.setState({data:data})
            console.log("data",data)
            this.props.dispatch(actions.change('formLyfeStyleEditor', data))
            this.props.dispatch(actions.change('formLyfeStyleEditor.id', this.props.match.params.LyfeStyleId))
        })
    }else{
        this.props.dispatch(actions.reset('formLyfeStyleEditor'))
    }
    }
    renderToggleInput = (field) => (
        <>
            <Switch {...field} />
        </>
    );
    renderLabel=(ingredient)=>{
        if(ingredient.factRestriction){
            return (`${ingredient.name} ${ingredient.greaterthan?'>':'<'} ${ingredient.value}${ingredient.measure}`)
        }else{
            return(ingredient.name)
        }
    }
    renderRestrictionTab=()=>{
        if(this.state.canEdit||this.state.isUpdating===false)
        return(<Col className="border border-info rounded Add-Gutter" style={{ padding: "10px 0px 10px 0px" }} sm={4} md={{ size: 5 }} >
        <Row>
            <Col><RestrictionTabsComponent handleDelete={(item)=> this.handleDelete(item)} handleAddIngredient={(item) => this.handleAddIngredient(item)} {...this.props} /></Col>
        </Row>
    </Col>)
    }
    renderUpdateButton=()=>{
        if(this.state.canEdit||this.state.isUpdating===false)
        return(    <Row>
            <Col md={4}>
            <Button color="primary" type="submit">{this.state.isUpdating ? 'Update' : 'Create'}</Button>
            </Col>
            <Col md={4}><Label htmlFor="public">Public</Label>
                <Control.checkbox
                    model=".public"
                    component={this.renderToggleInput}
                />
            </Col>
        </Row>)
    }
    renderRestrictionTab=()=>{
        if(this.state.canEdit||this.state.isUpdating===false)
        return(<Col className="border border-info rounded Add-Gutter" style={{ padding: "10px 0px 10px 0px" }} sm={4} md={{ size: 5 }} >
        <Row>
            <Col><RestrictionTabsComponent handleDelete={(item)=> this.handleDelete(item)} handleAddIngredient={(item) => this.handleAddIngredient(item)} {...this.props} /></Col>
        </Row>
    </Col>)
    }
    renderNameInput=()=>{
        if(this.state.canEdit||this.state.isUpdating===false)
        return(<Row className="form-group">
        <Col md={10}>
            <Label htmlFor="name" md={2}>Name</Label>
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
    </Row>)
    return(<Row className="text-center">
    <Col md={12}>
        <h1>{this.state.data.name}</h1>
    </Col>
</Row>)
    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col className="border border-info rounded Add-Gutter" style={{ padding: "10px 0px 10px 0px" }} sm={4} md={{ size: 5 }} >
                        <Form model="formLyfeStyleEditor" onSubmit={(values) => this.handleformLyfeStyleEditor(values)}>
                            {this.renderNameInput()}
                            <Row>
                                <Col md="12" >Restrictions:</Col>
                                <Col style={{ overflow: "auto", maxHeight: "200px" }}>
                                    {this.props.formLyfeStyleEditor.restrictions ? this.props.formLyfeStyleEditor.restrictions.map(restriction => {
                                        return (<Chip key={restriction.id} color={restriction.factRestriction?'secondary':'primary'} label={this.renderLabel(restriction)} onDelete={restriction.factRestriction?null:this.state.canEdit||this.state.isUpdating===false?()=>this.handleDelete(restriction):null} />)
                                    })
                                        : <></>}
                                </Col>
                            </Row>
                        {this.renderUpdateButton()}
                        </Form>
                    </Col>
                    <Col className="border border-info rounded Add-Gutter" style={{ padding: "10px 0px 10px 0px" }} sm={4} md={{ size: 5 }} >
                        <Row>
                            <Col>
                                <ViewSubscribers lId={this.props.match.params.LyfeStyleId}/>
                            </Col>
                        </Row>
                    </Col>
                    {this.renderRestrictionTab()}                                    
                    
                </Row>
            </Container>
        )
    }
}
export default connect(({ formLyfeStyleEditor }) => ({ formLyfeStyleEditor }))(LyfeStyleEdit)