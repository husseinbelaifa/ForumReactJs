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