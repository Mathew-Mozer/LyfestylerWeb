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

export const fetchLyfeStyles = () => (dispatch) => {
    if (firebase.auth().currentUser) {
        //let ls = firebase.firestore().collection("lyfestyles")
        let subscriptions = firebase.firestore().collection("subscriptions").where('userid', '==', firebase.auth().currentUser.uid)
        subscriptions.onSnapshot({ includeMetadataChanges: true },snapshot => {
            snapshot.docChanges().forEach(change => {
                var source = snapshot.metadata.fromCache ? "local cache" : "server";
          
                if (change.type === 'added') {
                    console.log(`Subscription Change Add(${source}): `, change.doc.id);
                    //dispatch({type:ActionTypes.ADD_LYFESTYLE,payload:{id:change.documentId,...change.doc.data()}})
                  }
                  if (change.type === 'modified') {
                    console.log(`Subscription Change Modified: (${source})`, change.doc.data());
                    //dispatch({type:ActionTypes.UPDATE_LYFESTYLE,payload:{id:change.documentId,...change.doc.data()}})
                  }
                  if (change.type === 'removed') {
                    console.log(`Subscription Change Removed: (${source})`, change.doc.data());
                    dispatch({type:ActionTypes.DELETE_LYFESTYLE,payload:{id:change.documentId,...change.doc.data()}})
                  }
            })
            snapshot.forEach(doc => {
                let lyfestyles = firebase.firestore().collection("lyfestyles").where(firebase.firestore.FieldPath.documentId(),"==",doc.data().lyfestyleid)
                lyfestyles.onSnapshot({ includeMetadataChanges: true },lssnapshot => {
                    var source = snapshot.metadata.fromCache ? "local cache" : "server";
                        console.log(`LyfeStyle update from:${source}`)
                    lssnapshot.docChanges().forEach(change => {
                        if (change.type === 'added') {
                            dispatch({type:ActionTypes.ADD_LYFESTYLE,payload:{id:change.documentId,subscriptionId:doc.id,active:doc.data().active,...change.doc.data()}})
                        }
                        if (change.type === 'modified') {
                          console.log('LyfeStyle Change Modified: ', change.doc.data());
                          dispatch({type:ActionTypes.UPDATE_LYFESTYLE,payload:{id:change.documentId,subscriptionId:doc.id,active:doc.data().active,...change.doc.data()}})
                        }
                        if (change.type === 'removed') {
                          console.log('LyfeStyle Change Removed: ', change.doc.data());
                          dispatch({type:ActionTypes.DELETE_LYFESTYLE,payload:{id:change.documentId,...change.doc.data()}})
                        }
                    })
                }, err => dispatch(lyfeStylesFailed(err)))
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
    
/*
  lyfestyles.onSnapshot({ includeMetadataChanges: true },lssnapshot => {
        lssnapshot.docChanges().forEach(change => {
            if (change.type === 'added') {
                console.log('Ingredient Change Added: ', change.doc.id);  
                dispatch({type:ActionTypes.ADD_INGREDIENT,payload:{id:change.doc.id,...change.doc.data()}})
            }
            if (change.type === 'modified') {
              console.log('Ingredient Change Modified: ', change.doc.id);
              dispatch({type:ActionTypes.UPDATE_INGREDIENT,payload:{id:change.doc.id,...change.doc.data()}})
            }
            if (change.type === 'removed') {
              console.log('Ingredient Change Removed: ', change.doc.id);
            }
        })
    }, err => dispatch(lyfeStylesFailed(err)))

        
        //.catch(error => dispatch(ingredientsFailed(error.message)));
        */
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

export const addLyfeStyle = (payload) => {
    firebase.firestore().collection("lyfestyles").doc().set(payload)
        .then(console.log("document written"))
        .catch(error => console.log("Error:", error))
}
export const updateLyfeStyle = (payload) => (dispatch) => {
    firebase.firestore().collection("lyfestyles").doc(payload.id).set(payload)
        .then((data) => console.log("Dispatch", data))
        .catch(error => console.log("Error:", error))
}