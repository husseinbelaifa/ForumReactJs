import firebase from '../../config/fbConfig';
export const fetchCurrentUser = (id) => (dispatch) => {
  const refbd = firebase.database().ref(`users/${id}`);

  refbd.on('value', snapshot => {

    return dispatch({
      type: 'FETCH_USER',
      user: snapshot.val()
    });

  })
  // .then((snapshot) => {
  //  return dispatch({
  //   type: 'FETCH_USER',
  //   user: snapshot.val()
  //  })
  // })
  // .catch(error => dispatch({
  //  type: 'FETCH_USER_ERROR',
  //  error
  // }));
}