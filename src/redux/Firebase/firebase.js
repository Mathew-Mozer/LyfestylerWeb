import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

const settings = {timestampsInSnapshots: true};

const configFB = {
    apiKey: "AIzaSyAIVRa9S8D_40tZfvBGbS_p8u31KUZd-jY",
    authDomain: "lyfestyler-28ee9.firebaseapp.com",
    databaseURL: "https://lyfestyler-28ee9.firebaseio.com",
    projectId: "lyfestyler-28ee9",
  // ...
  };

if (!firebase.apps.length) {
    firebase.initializeApp(configFB);
}

export default firebase;