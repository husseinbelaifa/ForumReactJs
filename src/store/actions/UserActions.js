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

export const fetchUserProfile = (id) => (dispatch) => {
  const refbd = firebase.database().ref(`users/${id}`);

  refbd.on('value', snapshot => {

    return dispatch({
      type: 'FETCH_USER_PROFILE',
      user: {
        userId: id,
        user: snapshot.val()
      }
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

export const countUser = () => dispatch => {
  firebase.database().ref(`users`).on('value', snapshot => {
    return dispatch({
      type: 'COUNT_USER_FOOTER',
      userCount: snapshot.numChildren()
    })
  })
}

export const checkModerator = (userId) => dispatch => {
  firebase.database().ref(`moderators/${userId}`).on('value', snapshot => {
    if (snapshot.numChildren()) return dispatch({
      type: 'MODERATOR_OK'
    });
    // else return dispatch({
    //   type: 'MODERATOR_NO_OK'
    // });
  })
}