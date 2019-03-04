import React, { Component } from 'react'
import { Container, Row, Col, Alert } from 'reactstrap'

const ignoredIngredients = ["ingredients"]
export default class ItemViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            err: "",
            product: null,
            failure: true
        }
    }
    unEntity(str) {
        return str ? str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">") : "";
    }
    
    componentDidMount() {
        this.getFromOpenFoodFacts()
    }
    
    componentDidUpdate(prevProps){
        if(prevProps!=this.props)
        if(this.props.allergies.length>0&&this.state.product){
            let prods = {...this.state.product}
            prods.ingredients = prods.ingredients.filter((item)=>{
                console.log("check",item.text,ignoredIngredients.indexOf(item.text.toLowerCase()))
                return ignoredIngredients.indexOf(item.text.toLowerCase().trim())===-1
            }).map((ing)=>{
                var tmp = ing
                tmp.isAllergen = this.checkAllergen(ing.text)
                console.log("setting",ing.text,"to",tmp.isAllergen)
                
                return(tmp)
            })
            this.setState({product:prods})
        }
    }
    getFromOpenFoodFacts() {
        console.log("mounting")
        fetch(`https://world.openfoodfacts.org/api/v0/product/${this.props.upc}.json`, {
            method: "GET",
            headers: {
            }
        })
            .then(results => results.json())
            .then(data => {
                console.log(data)
                if (data.status !== 1) {
                    this.setState({ failure: true })
                } else {
                    this.setState({ product: data.product })
                }
            })
            .catch(err => this.setState({ err: err }));
    }
    cleanUpAllergen = item => {
        return (item.replace(/(and)\b|(or)\b|/gi, '').trim())
    }
    checkAllergen = (allergen) => {
        if (this.props.allergies.length > 0){
            var tagsFound = []
            this.props.ingredients.ingredients.filter((item) => {
                var allergens = allergen.toLowerCase().split("")
                //if(item.name.toLowerCase()===allergen.toLowerCase()){
                if (item.name.toLowerCase() === allergen.toLowerCase()) {
                    item.tags.map((item) => {
                        tagsFound.push(this.props.ingredients.ingredients.filter((flt) => flt.id === item)[0].name)
                    })
                }
            })
            return (this.props.allergies.some((item) => {
                if (allergen.toLowerCase().includes(item)) {
                    return (true)
                }
                tagsFound.filter((ag) => {
                    if (ag.toLowerCase() === item) {
                        return (true)
                    }
                })
                if (tagsFound.length > 0) return (true)
    
            }))
        }
            
    }
    render() {
        if (!this.state.product) {
            return (<Container>
                <Row>
                    <Col sm={12} md={12}><h1>No Product Found</h1></Col>
                </Row>
            </Container>)
        } else {
            return (<Container>
                <Row>
                    <Col sm={12} md={12}><h1>{`${this.unEntity(this.state.product.brands)} ${this.unEntity(this.state.product.product_name)} `}</h1></Col>
                </Row>
                <Row>
                    <Col sm={12} md={12}><h1>{this.state.err}</h1></Col>
                </Row><Row>
                    {this.state.product.ingredients.length > 0 ? this.state.product.ingredients.map((item) => {
                        return (<Col sm={1} md={2}>
                            <Alert color={item.isAllergen? "danger" : "success"}>
                                {this.cleanUpAllergen(item.text)}
                            </Alert>
                        </Col>)
                    }) : "No Ingredients Found"}
                </Row><Row>
                    <Col sm={12} md={12}></Col>
                </Row>
            </Container>)
        }
    }
}