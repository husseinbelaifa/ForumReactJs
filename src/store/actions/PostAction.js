import firebase from "../../config/fbConfig";
import moment from 'moment';
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

      if (snapshot.val())
        return dispatch({
          type: 'FETCH_POSTS_THREAD',
          post: {
            threadId: threadId,
            post: snapshot.val()
          }
        })
    })
}

export const deletePost = (postId, userId, threadId) => dispatch => {

  firebase.database().ref(`posts/${postId}`).remove();
  //remove post in users
  firebase.database().ref(`/users/${userId}/posts/${postId}`).remove();

  //   //remove post in threads

  firebase.database().ref(`/threads/${threadId}/posts/${postId}`).remove();

  //   //get postId & publishedAt of lastPost

  firebase.database().ref(`/posts`).orderByChild('threadId').equalTo(threadId).limitToLast(1)
    .once('value', snapshot => {

      const snapshotKey = Object.keys(snapshot.val()).filter(KeyName => {
        return KeyName;
      });

      firebase.database().ref(`/threads/${threadId}`).update({
        lastPostAt: snapshot.val()[snapshotKey[0]].publishedAt,
        lastPostId: snapshot.val()[snapshotKey[0]].key
      })
    });



  //check if user has no other contributor

  //count numberOfpost for an userIf with threadId & postId!==firstPostId

  //getfirstPostId
  let numberOfPost = 0;
  firebase.database().ref(`/threads/${threadId}/firstPostId`)
    .once('value', snapshot => {

      const firstPostId = snapshot.val();
      firebase.database().ref(`/posts`).orderByChild('threadId').equalTo(threadId)
        .once('value', snapshot => {

          snapshot.forEach(postSnapShot => {

            if (postSnapShot.val().key !== firstPostId && postSnapShot.val().userId === userId) {
              numberOfPost++;
            }

          });
        })

    })

  // if(numberOfPost===0) firebase.database().ref(`threads/${threadId}/contributors/${userId}`).remove();

  return dispatch({
    type: 'REMOVE_POST'
  });

}

export const createPost = (threadId, userId, formValues) => dispatch => {

  const refKey = firebase.database().ref().child('posts').push().key; // generate a new key
  firebase.database().ref(`posts/${refKey}`).update({
    key: refKey,
    publishedAt: (new Date()).getTime(),
    text: formValues.postArea,
    threadId: threadId,
    userId: userId,
  });

  //update user

  firebase.database().ref(`/users/${userId}/posts`).update({
    [refKey]: refKey
  });

  //update Thread

  firebase.database().ref(`posts/${refKey}`).once('value', snapshot => {

    firebase.database().ref(`/threads/${threadId}`).update({
      lastPostId: snapshot.val().key,
      lastPostAt: snapshot.val().publishedAt,
    });
    firebase.database().ref(`/threads/${threadId}/posts`).update({
      [refKey]: refKey
    });


    firebase.database().ref(`/threads/${threadId}/contributors`).update({
      [userId]: userId

    });
    // firebase.database().ref(`/threads/${threadId}/contributors`).once('value', snapshot => {
    //   console.log(snapshot.val());
    //   firebase.database().ref(`/threads/${threadId}/contributors`).update({
    //     [userId]: userId

    //   });
    //   if (snapshot.numChildren() === 0) {
    //     firebase.database().ref(`/threads/${threadId}`).update({
    //       contributors: {
    //         [userId]: userId
    //       }
    //     });
    //   } else {
    //     firebase.database().ref(`/threads/${threadId}/contributors`).update({
    //       [userId]: userId
    //     });
    //   }
  })


  // })



  return dispatch({
    type: 'POST_ADD'
  });
  // firebase.database().ref(`posts/${refKey}`).on('value', snapshot => {

  //   if (snapshot.val()) {
  //     //update the threads
  //     firebase.database().ref(`/threads/${threadId}`).on('value', snapshot1 => {
  //       console.log(snapshot1.val());
  //       // let contributors = null;
  //       // if (!snapshot1.val().contributors) contributors = {
  //       //   [userId]: userId
  //       // }
  //       // else
  //       // if (!Object.values(snapshot1.val().contributors).includes(userId))
  //       //   contributors = {
  //       //     ...snapshot1.val().contributors,
  //       //     [userId]: userId
  //       //   };
  //       // else contributors = {
  //       //   ...snapshot1.val().contributors,
  //       // };


  //       firebase.database().ref(`/threads/${threadId}`).update({
  //         lastPostId: snapshot.val().key,
  //         lastPostAt: snapshot.val().publishedAt,
  //         posts: {
  //           ...snapshot1.val().posts,
  //           [snapshot.val().key]: snapshot.val().key
  //         },

  //         // contributors: contributors
  //       });

  //       // firebase.database().ref(`/forums/${snapshot1.val().forumId}`).update({
  //       //   lastPostId: snapshot.val().key
  //       // });
  //       firebase.database().ref(`/users/${userId}`).on('value', snapshot2 => {

  //         firebase.database().ref(`/users/${userId}`).update({
  //           posts: {
  //             ...snapshot2.val().posts,
  //             [snapshot.val().key]: snapshot.val().key
  //           }
  //         })
  //       });
  //     })

  //     return dispatch({
  //       type: 'POST_ADD'
  //     });

  //   }


  // })



}

export const postsCount = () => dispatch => {

  firebase.database().ref(`posts`)

    .on('value', (snapshot => {

      return dispatch({
        type: "COUNT_POSTS_FOOTER",
        postCount: snapshot.numChildren()

      })
    }));

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