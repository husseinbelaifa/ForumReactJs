import firebase from '../../config/fbConfig';
export const fetchCurrentUser = (id) => (dispatch) => {
 firebase.database().ref(`users/${id}`)
  .then((snapshot) => {
   return dispatch({
    type: 'FETCH_USER',
    user: snapshot.val()
   })
  })
  .catch(error => dispatch({
   type: 'FETCH_USER_ERROR',
   error
  }));
}