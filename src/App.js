import React, { Component } from 'react';
import Main from './Component/MainComponent'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore';
import firebase from 'firebase';
import './App.css';


const store = ConfigureStore();
// Configure Firebase.

const configFB = {
  apiKey: "AIzaSyAIVRa9S8D_40tZfvBGbS_p8u31KUZd-jY",
  authDomain: "lyfestyler-28ee9.firebaseapp.com",
  databaseURL: "https://lyfestyler-28ee9.firebaseio.com",
// ...
};
if (!firebase.apps.length) {
  firebase.initializeApp(configFB);
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
