import firebase from "../../config/fbConfig";

export const threadCount = () => dispatch => {

  firebase.database().ref(`threads`).
  child(`threads`).orderByChild('forumId').once('value')
    .then((snapshot => {
      console.log(snapshot.val());
      return dispatch({
        type: "COUNT_THREAD",
        thread: {
          forumId: snapshot.val(),
          threadCount: snapshot.numChildren()
        }
      })
    }));
  // const thread = null;
  // refbd.on("value", snapshot => {

  //     thread = {
  //       forumId: forumId,
  //       threadCount: snapshot.numChildren()
  //     };


  //   })
  //   .then(() => dispatch({
  //     type: "COUNT_THREAD",
  //     thread: thread
  //   }));
};

export const fetchLastThread = () => dispatch => {
  const refbd = firebase.database().ref(`threads`);
};