import firebase from '../../config/fbConfig';
export const fetchCategories = () => dispatch => {

 const refbd = firebase.database().ref(`categories`);

 refbd.on('value', snapshot => {

  return dispatch({
   type: 'FETCH_CATEGORIES',
   categories: snapshot.val(),


  });

 })

}

export const fetchSubCategories = () => dispatch => {
 const refbd = firebase.database().ref(`forums`);

 refbd.on('value', snapshot => {

  return dispatch({
   type: 'FETCH_SUB_CATEGORY',
   subCategories: snapshot.val()
  });

 })
}