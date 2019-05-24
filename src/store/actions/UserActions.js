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

export const fetchUserThread = (id, threadId) => (dispatch) => {
  const refbd = firebase.database().ref(`users/${id}`);

  refbd.on('value', snapshot => {



    return dispatch({
      type: 'FETCH_USER_THREAD',
      userThread: {
        threadId: threadId,
        user: snapshot.val()
      }
    });

  })

}

export const fetchUserPost = (id, postId) => (dispatch) => {
  const refbd = firebase.database().ref(`users/${id}`);

  refbd.on('value', snapshot => {



    return dispatch({
      type: 'FETCH_USER_POST',
      userPost: {
        postId: postId,
        user: snapshot.val()
      }
    });

  })

}