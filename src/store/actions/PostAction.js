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