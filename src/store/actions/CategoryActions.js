import firebase from '../../config/fbConfig';

export const fetchCategories = () => dispatch => {

 const refbd = firebase.database().ref(`categories`);

 refbd.on('value', snapshot => {
  // console.log(snapshot.val());
  return dispatch({
   type: 'FETCH_CATEGORIES',
   categories: snapshot.val(),


  });

 })

}

export const fetchCategory = (categoryId) => dispatch => {
 const refbd = firebase.database().ref(`categories/${categoryId}`);
 refbd.on('value', snapshot => {

  return dispatch({
   type: 'FETCH_CATEGORY',
   category: snapshot.val(),


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

//fetch subofsubs categories

// export const fetchSubOfSubCategories = (categoryId, subCategoryId) => dispatch => {

//  const refbd = firebase.database().ref(`forums/${}`).orderByChild('categoryId').equalTo();


// }

export const fetchSubCategoriesById = (id) => dispatch => {
 const refbd = firebase.database().ref(`forums/${id}`);


 refbd.on('value', snapshot => {

  console.log("fetching");
  console.log(snapshot.val());

  return dispatch({
   type: 'FETCH_SUB_CATEGORY_By_Id',
   subCategories: snapshot.val()
  });

 })
}

export const fetchSubCategoriesByCategoryId = (categoryId) => dispatch => {
 const refbd = firebase.database().ref(`forums`).orderByChild('categoryId').equalTo(categoryId);

 refbd.on('value', snapshot => {

  console.log(snapshot.val());


  return dispatch({
   type: 'FETCH_SUB_CATEGORY_By_CATEGORYID',
   subCategories: snapshot.val()
  });

 })
}