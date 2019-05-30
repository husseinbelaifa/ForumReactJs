import firebase from "../../config/fbConfig";
import {
  fetchSubCategoriesById
} from "./CategoryActions.js";
import {
  fetchUserThread
} from './UserActions.js';
import {
  postCount,
  fetchPostByThread
} from './PostAction.js';

export const threadsCount = () => dispatch => {

  firebase.database().ref(`threads`)

    .on('value', (snapshot => {

      return dispatch({
        type: "COUNT_THREAD_FOOTER",

        threadCount: snapshot.numChildren()

      })
    }));

};

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

export const threadCountUser = (userId) => dispatch => {

  firebase.database().ref(`threads`)
    .orderByChild('userId').equalTo(userId)
    .on('value', (snapshot => {

      return dispatch({
        type: "COUNT_THREAD_USER",
        thread: {
          userId: userId,
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

export const addThread = (forumId, userId, formValues) => dispatch => {

  var refkey = firebase.database().ref().child('threads').push().key;

  firebase.database().ref(`/threads/${refkey}`).set({
    key: refkey,
    forumId: forumId,
    publishedAt: (new Date).getTime(),
    slug: formValues.title,
    title: formValues.title,
    userId: userId

  });

  firebase.database().ref(`/threads/${refkey}`).once('child_added', snapshot => {
    //create a new Post
    var refkeyPost = firebase.database().ref().child('posts').push().key;
    firebase.database().ref(`posts/${refkeyPost}`).set({
      key: refkeyPost,
      publishedAt: (new Date()).getTime(),
      text: formValues.content,
      threadId: refkey,
      userId: userId,

    });


    //update thread

    firebase.database().ref(`posts/${refkeyPost}`).once('value', snapshot1 => {

      firebase.database().ref(`/threads/${refkey}`).update({

        firstPostId: refkeyPost,
        lastPostAt: snapshot1.val().publishedAt,
        lastPostId: refkeyPost,
        posts: {
          ...snapshot1.val().posts,
          [snapshot1.val().key]: snapshot1.val().key
        }
      });


    });

    //update user

    firebase.database().ref(`users/${userId}`).once('value', snapshot2 => {

      firebase.database().ref(`users/${userId}`).update({

        posts: {
          ...snapshot2.val().posts,
          [refkeyPost]: refkeyPost
        },
        threads: {
          ...snapshot2.val().threads,
          [refkey]: refkey
        }

      });


    });

    //update forum

    firebase.database().ref(`forums/${forumId}`).once('value', snapshot3 => {
      firebase.database().ref(`forums/${forumId}`).update({
        threads: {
          ...snapshot3.val().threads,
          [refkey]: refkey
        },
        lastPostId: refkeyPost
      })
    })


    if (snapshot.val())
      return dispatch({
        type: 'THREAD_ADD'
      });

  })

}

export const fetchThreadByContributor = (userId) => dispatch => {

  firebase.database().ref(`threads`).orderByChild('contributors')
    .on('value', snapshot => {

      const newDate = Object.keys(snapshot.val()).map(keyName => {


        if (snapshot.val()[keyName].contributors && Object.values(snapshot.val()[keyName].contributors).includes(userId)) {
          return snapshot.val()[keyName];

        }


      })


      // console.log(newDate);
      const newSnapShot = newDate && Object.assign({}, ...newDate.map(o => {
        if (o !== undefined) {

          dispatch(fetchSubCategoriesById(o.forumId));

          dispatch(fetchUserThread(o.userId, o.key));
          dispatch(postCount(o.key));
          // o.contributors && Object.values(o.contributors).map(keyName => {
          //   return dispatch(postCount(keyName));
          // })

          dispatch(fetchPostByThread(o.key));

          return {
            [o.key]: o
          };

        }
      }));

      return dispatch({
        type: 'FETCH_THREAD_BY_CONTRIBUTOR',

        thread: {
          userId: userId,
          thread: newSnapShot

        }

      });
      // console.log(newSnapShot);



    })
}

export const fetchThreadByUserId = (userId) => dispatch => {

  firebase.database().ref(`threads`).orderByChild('userId').equalTo(userId)
    .on('value', snapshot => {



      snapshot.val() && Object.keys(snapshot.val()).map(keyName => {
        dispatch(fetchSubCategoriesById(snapshot.val()[keyName].forumId));
        dispatch(fetchUserThread(snapshot.val()[keyName].userId, snapshot.val()[keyName].key));
        dispatch(postCount(snapshot.val()[keyName].key));
        dispatch(fetchPostByThread(snapshot.val()[keyName].key));
        // dispatch(fetchLastPostInSubCategories(snapshot.val()[keyName].firstPostId));
      })

      return dispatch({
        type: 'FETCH_THREAD_PROFILE',

        thread: {
          userId: userId,

          thread: snapshot.val()
        }

      })
    })
}

export const fetchThreadByForum = (forumId, currentPage, threadPerPage) => dispatch => {
  const startAt = currentPage * threadPerPage - threadPerPage

  const refbd = firebase.database().ref(`threads`).orderByChild('forumId').equalTo(forumId);

  refbd.on('value', snapshot => {

    // console.log(snapshot.val());
    let index = 0;
    let index1 = 0;

    const data = snapshot.val() && Object.keys(snapshot.val()).map(keyName => {


      if (index < startAt) index++;
      else if (index1 < threadPerPage) {
        index1++;
        return snapshot.val()[keyName];

      }


    });

    const newData = data && Object.assign({}, ...data.map(o => {
      if (o !== undefined) return {
        [o.key]: o
      };
    }));



    return dispatch({
      type: 'FETCH_THREAD_BY_FORUM',
      thread: newData
    })
  })
}