import firebase from '../../config/fbConfig';
export const fetchCurrentUser = (id) => (dispatch) => {
  const refbd = firebase.database().ref(`users/${id}`);

  refbd.on('value', snapshot => {

    return dispatch({
      type: 'FETCH_USER',
      user: snapshot.val()
    });

  })

}

export const fetchUserForum = (id, postId) => (dispatch) => {
  const refbd = firebase.database().ref(`users/${id}`);

  refbd.on('value', snapshot => {

    return dispatch({
      type: 'FETCH_USER_Forum',
      userForum: {
        postId: postId,
        user: snapshot.val()
      }
    });

  })

}