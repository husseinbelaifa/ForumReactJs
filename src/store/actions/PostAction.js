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

export const fetchPostByThread = (threadId) => dispatch => {
  firebase.database().ref(`posts`).orderByChild('threadId').equalTo(threadId)
    .on('value', snapshot => {

      return dispatch({
        type: 'FETCH_POSTS_THREAD',
        post: {
          threadId: threadId,
          post: snapshot.val()
        }
      })
    })
}


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

export const postCountUser = (userId) => dispatch => {

  firebase.database().ref(`posts`)
    .orderByChild('userId').equalTo(userId)
    .on('value', (snapshot => {

      return dispatch({
        type: "COUNT_POSTS_USER",
        post: {
          userId: userId,
          postCount: snapshot.numChildren()
        }
      })
    }));

};