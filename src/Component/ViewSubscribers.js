import React, { Component } from 'react';
import { Col, Row, Container, Label, Button } from 'reactstrap'
import firebase from '../Firebase/firebase'



export default class ViewSubscribers extends Component {
    constructor(props){
        super(props)
        this.state = {
            Subscribers: [],
            loadingUsers:true
        }
        this.getSubscribers(this.props.lId)
    }
    

    getSubscribers = lId => {
        var subs = []
        console.log("propId", lId)
        if(lId)
        firebase.firestore().collection("subscriptions").where("lyfestyleid", "==", lId).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    return;
                }
                snapshot.forEach(doc => {
                    firebase.firestore().collection("users").doc(doc.data().userid).get()
                        .then(snapshot => {
                            if (snapshot.empty) {
                                console.log("couldn't find user")
                                return;
                            }
                            subs.push({
                                username:snapshot.data().username?snapshot.data().username:"<Unknown User>"
                            })    
                            console.log("found user ", snapshot.data().username)
                            console.log("count",subs.length)
                            this.setState({
                                Subscribers: subs
                            })
                        })
                        .catch(err => {
                            console.log('Error getting documents', err);
                        })
                });
                this.setState({
                    loadingUsers:false
                })
            })
            .catch(err => {
                console.log('Error getting documents', err);
            })
    }


    componentDidMount() {
    }
    render() {
        if(this.state.loadingUsers){
            return(
                <Container>
                        <Row>
                            <Col>Loading Users</Col>
                        </Row>
            </Container>
            )
        }else
        return (
            <Container>
                      <Row>
                            <Col><h1>Subscribers</h1></Col>
                        </Row>
                {this.state.Subscribers.map((user,index) => {
                    return (
                        <Row>
                            <Col key={index}>{user.username?user.username:""}</Col>
                        </Row>
                    )
                })}
            </Container>
        )
    }

}
