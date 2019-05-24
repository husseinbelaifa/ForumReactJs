import firebase from "../../config/fbConfig";

export const threadCount = (forumId) => dispatch => {

  firebase.database().ref(`threads`)
    .orderByChild('forumId').equalTo(forumId)
    .on('value', (snapshot => {

      return dispatch({
        type: "COUNT_THREAD",
        thread: {
          forumId: forumId,
          threadCount: snapshot.numChildren()
        }
      })
    }));

};

export const fetchThread = (id) => dispatch => {
  firebase.database().ref(`threads/${id}`)
    .on('value', snapshot => {
      return dispatch({
        type: 'FETCH_THREAD',
        thread: snapshot.val()
      })
    })
}

export const fetchThreadByForum = (forumId) => dispatch => {
  firebase.database().ref(`threads`).orderByChild('forumId').equalTo(forumId)
    .on('value', snapshot => {
      return dispatch({
        type: 'FETCH_THREAD_BY_FORUM',
        thread: snapshot.val()
      })
    })
}