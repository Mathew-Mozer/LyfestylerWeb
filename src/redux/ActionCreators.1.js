import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl'
import firebase from '../Firebase/firebase'

export const lyfeStylesFailed = (errmess) => ({
    type: ActionTypes.LYFESTYLES_FAILED,
    payload: errmess
});

export const addLyfeStyles = (payload) => ({
    type: ActionTypes.ADD_LYFESTYLES,
    payload: payload
})

export const lyfeStylesLoading = () => ({
    type: ActionTypes.LYFESTYLES_LOADING
});
const getSubscribeLyfestyle = (subscriptionData,dispatch) => {
    console.log("fetching Lyfestyle",subscriptionData.data().lyfestyleid)            
    let lyfestyles = firebase.firestore().collection("lyfestyles").where(firebase.firestore.FieldPath.documentId(),"==",subscriptionData.data().lyfestyleid)
                lyfestyles.onSnapshot(lssnapshot => {
                    lssnapshot.docChanges().forEach(change => {
                        if (change.type === 'added') {
                            console.log('LyfeStyle Change Added: ', change.doc.id);
                            dispatch({type:ActionTypes.ADD_LYFESTYLE,payload:{id:change.doc.id,subscriptionId:subscriptionData.id,active:subscriptionData.data().active,...change.doc.data()}})
                        }
                        if (change.type === 'modified') {
                          console.log('LyfeStyle Change Modified: ', change.doc.data());
                          dispatch({type:ActionTypes.UPDATE_LYFESTYLE,payload:{id:change.documentId,subscriptionId:subscriptionData.id,active:subscriptionData.data().active,...change.doc.data()}})
                        }
                        if (change.type === 'removed') {
                          console.log('LyfeStyle Change Removed: ', change.doc.data());
                          dispatch({type:ActionTypes.DELETE_LYFESTYLE,payload:{id:change.documentId,...change.doc.data()}})
                        }
                    })
                }, err => dispatch(lyfeStylesFailed(err)))
}
export const fetchLyfeStyles = () => (dispatch) => {
    dispatch({type:ActionTypes.LYFESTYLES_EMPTY})
    if (firebase.auth().currentUser) {
        //let ls = firebase.firestore().collection("lyfestyles")
        let subscriptions = firebase.firestore().collection("subscriptions").where('userid', '==', firebase.auth().currentUser.uid)
        subscriptions.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change=>{
                if(change.type==='added'){
                    getSubscribeLyfestyle(change.doc,dispatch)
                }
                if(change.type==='modified'){
                    getSubscribeLyfestyle(change.doc,dispatch)
                }
            })
            snapshot.docs.forEach(change => {
                
            })
            
        }, err => dispatch(lyfeStylesFailed(err)))
    } else {
        dispatch(addLyfeStyles([]))
    }
}



export const itemsFailed = (errmess) => ({
    type: ActionTypes.ITEMS_FAILED,
    payload: errmess
});

export const addItems = (payload) => ({
    type: ActionTypes.ADD_ITEMS,
    payload: payload
})

export const ItemsLoading = () => ({
    type: ActionTypes.ITEMS_LOADING
});

export const fetchItems = () => (dispatch) => {
    dispatch(lyfeStylesLoading(true));

    return fetch(baseUrl + 'items')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(payload => dispatch(addItems(payload)))
        .catch(error => dispatch(itemsFailed(error.message)));
}

export const ingredientsFailed = (errmess) => ({
    type: ActionTypes.INGREDIENTS_FAILED,
    payload: errmess
});

export const addIngredients = (payload) => ({
    type: ActionTypes.ADD_INGREDIENTS,
    payload: payload
})

export const ingredientsLoading = (payload = true) => ({
    type: ActionTypes.INGREDIENTS_LOADING,
    payload: payload
});


export const fetchIngredients = () => (dispatch) => {
    dispatch(lyfeStylesLoading(true));

    firebase.firestore().collection("ingredients").get()
  .then(snapshot => {
    if (snapshot.empty) {
      console.log('No matching documents.');
      return;
    }
    var ingredients=[]
    snapshot.forEach(doc => {
        ingredients.push({id:doc.id,...doc.data()})
    });
    dispatch({type:ActionTypes.ADD_INGREDIENTS,payload:ingredients})
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });
}

export const postIngredient = (name, tags) => (dispatch) => {
    //dispatch(ingredientsLoading(false))
    const newIngredient = {
        name: name,
        tags: tags
    }

    return fetch(baseUrl + 'ingredients', {
        method: 'POST',
        body: JSON.stringify(newIngredient),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(addIngredient(response)))
        .catch(error => {
            console.log('Add Ingredient ', error.message)
            alert('Your ingredient could not be added\nError: ' + error.message)
        })
}
export const putIngredient = (ingredient) => (dispatch) => {
    //dispatch(ingredientsLoading(false))
    return fetch(baseUrl + 'ingredients/' + ingredient.id, {
        method: 'PUT',
        body: JSON.stringify(ingredient),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(updateIngredient(response)))
        .catch(error => {
            console.log('Add Ingredient ', error.message)
            alert('Your ingredient could not be added\nError: ' + error.message)
        })
}

export const deleteIngredient = (ingredient) => (dispatch) => {
    dispatch(ingredientsLoading(false))
    return fetch(baseUrl + 'ingredients/' + ingredient.id, {
        method: 'DELETE',
        body: JSON.stringify(ingredient),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(response => dispatch(removeIngredient(ingredient)))
        .catch(error => {
            console.log('Add Ingredient ', error.message)
            alert('Your ingredient could not be added\nError: ' + error.message)
        })
}

export const addIngredient = (payload) => ({
    type: ActionTypes.ADD_INGREDIENT,
    payload: payload
});

export const removeIngredient = (payload) => ({
    type: ActionTypes.REMOVE_INGREDIENT,
    payload: payload
});

export const updateIngredient = (payload) => ({
    type: ActionTypes.UPDATE_INGREDIENT,
    payload: payload
});


export const fetchFoodTags = () => (dispatch) => {

    return fetch(baseUrl + 'foodtags')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText)
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(payload => dispatch(addFoodTags(payload)))
        .catch(error => console.log("Error getting Food Type " + error.message));
}

export const addFoodTags = (payload) => ({
    type: ActionTypes.ADD_FOODTAGS,
    payload: payload
});

export const addLyfeStyle = (payload) => (dispatch) =>{
    //console.log(JSON.stringify({...payload}))
        firebase.firestore().collection("lyfestyles").add(payload)
        .then(ref=>firebase.firestore().collection("subscriptions").add({active:true,lyfestyleid:ref.id,userid:firebase.auth().currentUser.uid,timestamp:firebase.database.ServerValue.TIMESTAMP}))
        .then(ref=>console.log("Added doc",ref.id))
        .catch(error => console.log("Error:", error))

}
export const updateLyfeStyle = (payload) => (dispatch) => {
    firebase.firestore().collection("lyfestyles").doc(payload.id).set(payload)
        .then((data) => console.log("Dispatch", data))
        .catch(error => console.log("Error:", error))
}