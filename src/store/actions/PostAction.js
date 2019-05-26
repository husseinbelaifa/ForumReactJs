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

export const postThumpUp = (postId, clicked) => dispatch => {

  firebase.database().ref(`posts/${postId}`).child('thumpUp')
    .once('value', snapshot => {
      if (!snapshot.val() && snapshot.val() !== 0) {

        firebase.database().ref(`posts/${postId}`).update({
          thumpUp: 0
        });

        return dispatch({
          type: 'UPDATE_THUMP_UP',
          postThumpUp: {
            postId: postId,
            thumpUp: 0

          }
        })

      } else {

        const thumpUp = clicked ? snapshot.val() + 1 : snapshot.val();
        firebase.database().ref(`posts/${postId}`).update({
          thumpUp: thumpUp
        });

        return dispatch({
          type: 'UPDATE_THUMP_UP',
          postThumpUp: {
            postId: postId,
            thumpUp: thumpUp

          }
        })


      }


    })

}

export const postThumpDown = (postId, clicked) => dispatch => {

  firebase.database().ref(`posts/${postId}`).child('thumpDown')
    .once('value', snapshot => {
      if (!snapshot.val() && snapshot.val() !== 0) {

        firebase.database().ref(`posts/${postId}`).update({
          thumpDown: 0
        });

        return dispatch({
          type: 'UPDATE_THUMP_DOWN',
          postThumpDOWN: {
            postId: postId,
            thumpDOWN: 0

          }
        })

      } else {

        const thumpDown = clicked ? snapshot.val() + 1 : snapshot.val();
        firebase.database().ref(`posts/${postId}`).update({
          thumpDown: thumpDown
        });

        return dispatch({
          type: 'UPDATE_THUMP_DOWN',
          postThumpDOWN: {
            postId: postId,
            thumpDOWN: thumpDown

          }
        })


      }


    })

}