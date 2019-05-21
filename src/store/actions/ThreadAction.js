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

export const fetchThread = () => dispatch => {

}