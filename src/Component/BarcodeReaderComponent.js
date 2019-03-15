import React, { Component } from 'react'
import GridListComponent from "./GridListComponent"
import firebase from '../Firebase/firebase'
import logo from '../noimage.png'

export default class BarCodeReaderComponent extends Component {
  state = {
    loadedBarcodes: null
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: user })
      if (user) {
        this.getUPC(user.uid)
      }
    }
    );
  }

  getUPC(uid) {
    console.log("UPC")
    var barcodes = []
    firebase.firestore().collection("users").doc(uid).collection("scanneditems").orderBy('created').get()
      .then(snapshot => {
        if (snapshot.empty) {
          return;
        }
        snapshot.forEach(doc => {
          var payload = {
            img: this.findImage(doc.data()),
            title: doc.data().name,
            author: doc.data().brand,
          }

          barcodes.push(payload)
        });
        this.setState({ loadedBarcodes: barcodes })
      })
      .catch(err => {
        console.log('Error getting documents', err);

      })
  }
  findImage(data){
    if(data.images.full) return data.images.full
    if(data.images.thumb) return data.images.thumb
    return({logo})
  }
  renderGrid() {
    if (this.state.loadedBarcodes) {
      return (
        <GridListComponent tileData={this.state.loadedBarcodes} />
      )
    } else {
      return (<h4>Loading</h4>)
    }
  }
  render() {

    return (
      <>{this.renderGrid()}</>
    )
  }
}