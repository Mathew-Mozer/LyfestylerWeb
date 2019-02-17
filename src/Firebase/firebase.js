import * as firebase from 'firebase';
import 'firebase/firestore'

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
firebase.firestore().enablePersistence({experimentalTabSynchronization:true})
.catch(function(err) {
    if (err.code == 'failed-precondition') {
        console.log("persistence can only be enabled in 1 tab")
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
    } else if (err.code == 'unimplemented') {
        console.log("Browser doesn't support persistance")
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
    }
});

export default firebase;