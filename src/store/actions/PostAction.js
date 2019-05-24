import firebase from "../../config/fbConfig";
export const fetchLastPostInSubCategories = (postId) => dispatch => {

  firebase.database().ref(`posts/${postId}`)

    .on('value', snapshot => {



      return dispatch({
        type: 'FETCH_POST',
        post: snapshot.val()
      })
    });

};


export const postCount = (threadId) => dispatch => {

  firebase.database().ref(`posts`)
    .orderByChild('threadId').equalTo(threadId)
    .on('value', (snapshot => {

      return dispatch({
        type: "COUNT_POSTS",
        post: {
          threadId: threadId,
          postCount: snapshot.numChildren()
        }
      })
    }));

};