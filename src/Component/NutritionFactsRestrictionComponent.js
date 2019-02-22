import React from 'react'
import { Row, Col, Container } from 'reactstrap'
import { connect } from 'react-redux';
import * as NutritionIds from '../shared/NutritionFactIds'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

class NutritionFactsRestriction extends React.Component {



    state = {
        Calories: "",
        TotalFat: "",
        TotalCarbohydrates: "",
        Protein: "",
        Sugars: "",
        SatFat: "",
        TransFat: "",
        Cholesterol: "",
        Sodium: "",
        DietaryFiber: "",
        NetCarbs: ""
    }
    componentDidMount() {

    }
    getValueById = (id) => {
        const index = this.props.formLyfeStyleEditor.restrictions.findIndex((item) => item.id === id)
        const tmp = this.props.formLyfeStyleEditor.restrictions[index]
        return (tmp ? tmp.value : "")
    }
    getMeasureById = (id) => {
        const index = this.props.formLyfeStyleEditor.restrictions.findIndex((item) => item.id === id)
        const tmp = this.props.formLyfeStyleEditor.restrictions[index]
        return (tmp ? tmp.measure : "g")
    }
    /*
        static getDerivedStateFromProps(nextProps, prevState) {
           const getValueById=(id)=>{
                const index = nextProps.formLyfeStyleEditor.restrictions.findIndex((item)=>item.id===id)
                const tmp = nextProps.formLyfeStyleEditor.restrictions[index]
                return(tmp?tmp.value:"")
            }
    
            return{
            Calories:nextProps.getValueById(NutritionIds.CALORIES),
            TotalFat:getValueById(NutritionIds.TOTAL_FAT),
            TotalCarbohydrates:getValueById(NutritionIds.TOTAL_CARBOHYDRATES),
            Protein:getValueById(NutritionIds.PROTEIN),
            Sugars:getValueById(NutritionIds.SUGARS),
            SatFat:getValueById(NutritionIds.SATURATED_FAT),
            TransFat:getValueById(NutritionIds.TRANS_FAT),
            Cholesterol:getValueById(NutritionIds.CHOLESTEROL),
            Sodium:getValueById(NutritionIds.SODIUM),
            DietaryFiber:getValueById(NutritionIds.DIETARY_FIBER),
            NetCarbs:getValueById(NutritionIds.NET_CARBS) }
            
        }
    */

    handleChange = (event) => {
        const checkCal = /^\d*$/
        const checkAll = /^\d*$/
        //this.setState({[event.target.name]:event.target.value})
        const val = event.target.value
        const valObject = {
            factRestriction: true,
            measure: event.target.name === "Calories" ? "" : event.target.value.includes("mg") ? "mg" : "g",
            greaterThan: true,
            name: event.target.name
        }
        switch (event.target.name) {
            case "Calories":
                valObject.id = 1
                valObject.name = "Calories"
                valObject.value = checkCal.test(val) ? val : ""
                break;
            case "TotalFat":
                valObject.id = 2
                valObject.name = "Total Fat"
                valObject.value = checkAll.test(event.target.value) ? event.target.value : ""
                break;
            case "SatFat":
                valObject.id = 3
                valObject.name = "Saturated Fat"
                valObject.value = checkAll.test(event.target.value) ? event.target.value : ""
                break;
            case "TransFat":
                valObject.id = 4
                valObject.name = "Trans Fat"
                valObject.value = checkAll.test(event.target.value) ? event.target.value : ""
                break;
            case "Cholesterol":
                valObject.id = 5
                valObject.name = "Cholesterol"
                valObject.value = checkAll.test(event.target.value) ? event.target.value : ""
                break;
            case "Sodium":
                valObject.id = 6
                valObject.name = "Sodium"
                valObject.measure = "mg"
                valObject.value = checkAll.test(event.target.value) ? event.target.value : ""
                break;
            case "TotalCarbohydrates":
                valObject.id = 8
                valObject.name = "Total Carbs"
                valObject.value = checkAll.test(event.target.value) ? event.target.value : ""
                break;
            case "DietaryFiber":
                valObject.id = 9
                valObject.name = "Dietary Fiber"
                valObject.value = checkAll.test(event.target.value) ? event.target.value : ""
                break;
            case "Sugars":
                valObject.id = 10
                valObject.name = "Sugar"
                valObject.value = checkAll.test(event.target.value) ? event.target.value : ""
                break;
            case "Protein":
                valObject.id = 11
                valObject.name = "Protein"
                valObject.value = checkAll.test(event.target.value) ? event.target.value : ""
                break;
            case "NetCarbs":
                valObject.id = 7
                valObject.name = "Net Carbs"
                valObject.value = checkAll.test(event.target.value) ? event.target.value : ""
                break;
            default:
                console.log("unknown", event.target.name)
                break;
        }

        if (+valObject.value.trim() !== 0 & valObject.value.trim() !== "") {

            this.props.handleAddIngredient(valObject)
        } else {
            this.props.handleDelete(valObject)
        }

    }

    render() {
        return (
            <Container>
                <Row style={{ borderBottom: "10px solid #000000" }}>
                    <Col>Nutrition Facts</Col>
                </Row>
                <Row style={{ borderBottom: "6px solid #000000" }}>
                    <Col>Calories</Col>
                    <Col><TextField
                        name="Calories"
                        variant="filled"
                        label="Calories"
                        value={this.getValueById(NutritionIds.CALORIES)}
                        onChange={this.handleChange}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"></InputAdornment>,
                        }}
                    />
                    </Col>
                </Row>
                <Row style={{ borderBottom: "1px solid #000000" }}>
                    <Col>Total Fat</Col>
                    <Col>
                        <TextField
                            name="TotalFat"
                            variant="filled"
                            label="Total Fat"
                            value={this.getValueById(NutritionIds.TOTAL_FAT)}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                            }}
                        />
                    </Col>
                </Row>
                <Row style={{ borderBottom: "1px solid #000000" }}>
                    <Col md={{ offset: 1, size: 5 }}>Saturated Fat</Col>
                    <Col><TextField
                            name="SatFat"
                            variant="filled"
                            label="Saturated Fat"
                            value={this.getValueById(NutritionIds.SATURATED_FAT)}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                            }}
                        /></Col>
                </Row>
                <Row style={{ borderBottom: "1px solid #000000" }}>
                    <Col md={{ offset: 1, size: 5 }}>Trans Fat</Col>
                    <Col><TextField
                            name="TransFat"
                            variant="filled"
                            label="Trans Fat"
                            value={this.getValueById(NutritionIds.TRANS_FAT)}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                            }}
                        /></Col>
                </Row>
                <Row style={{ borderBottom: "1px solid #000000" }}>
                    <Col>Cholesterol</Col>
                    <Col><TextField
                            name="Cholesterol"
                            variant="filled"
                            label="Cholesterol"
                            value={this.getValueById(NutritionIds.CHOLESTEROL)}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                            }}
                        /></Col>
                </Row>
                <Row style={{ borderBottom: "1px solid #000000" }}>
                    <Col>Sodium</Col>
                    <Col><TextField
                            name="Sodium"
                            variant="filled"
                            label="Sodium"
                            value={this.getValueById(NutritionIds.SODIUM)}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">mg</InputAdornment>,
                            }}
                        /></Col>
                </Row>
                <Row style={{ borderBottom: "1px solid #000000" }}>
                    <Col>Net Carbs</Col>
                    <Col><TextField
                            name="NetCarbs"
                            variant="filled"
                            label="Net Carbs"
                            value={this.getValueById(NutritionIds.NET_CARBS)}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                            }}
                        /></Col>
                </Row>
                <Row style={{ borderBottom: "1px solid #000000" }}>
                    <Col >Total Carbohydrates</Col>
                    <Col><TextField
                            name="TotalCarbohydrates"
                            variant="filled"
                            label="Total Carbohydrates"
                            value={this.getValueById(NutritionIds.TOTAL_CARBOHYDRATES)}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                            }}
                        /></Col>
                </Row>
                <Row style={{ borderBottom: "1px solid #000000" }}>
                    <Col md={{ offset: 1, size: 5 }}>Dietary Fiber</Col>
                    <Col><TextField
                            name="DietaryFiber"
                            variant="filled"
                            label="Dietary Fiber"
                            value={this.getValueById(NutritionIds.DIETARY_FIBER)}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                            }}
                        /></Col>
                </Row>
                <Row style={{ borderBottom: "10px solid #000000" }}>
                    <Col md={{ offset: 1, size: 5 }}>Sugars</Col>
                    <Col><TextField
                            name="Sugars"
                            variant="filled"
                            label="Sugars"
                            value={this.getValueById(NutritionIds.SUGARS)}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                            }}
                        /></Col>
                </Row>
                <Row style={{ borderBottom: "10px solid #000000" }}>
                    <Col>Protein</Col>
                    <Col><TextField
                            name="Protein"
                            variant="filled"
                            label="Protein"
                            value={this.getValueById(NutritionIds.PROTEIN)}
                            onChange={this.handleChange}
                            InputProps={{
                                endAdornment: <InputAdornment position="end">g</InputAdornment>,
                            }}
                        /></Col>
                </Row>

            </Container>
        )
    }
}

export default connect(({ formLyfeStyleEditor }) => ({ formLyfeStyleEditor }))(NutritionFactsRestriction)
