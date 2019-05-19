import firebase from '../../config/fbConfig'; // Import it.
export const signIn = credential => (dispatch, getState, {
  getFirebase
}) => {

  firebase
    .auth()
    .signInWithEmailAndPassword(
      credential.email,
      credential.password
    )
    .then(() =>
      dispatch({
        type: "LOGIN_SUCCESS"
      })
    )
    .catch(error =>
      dispatch({
        type: "LOGIN_FAILED",
        error: error.message
      })
    );
};

export const signOut = () => (dispatch, getState, {
  getFirebase
}) => {

  firebase
    .auth()
    .signOut()
    .then(() =>
      dispatch({
        type: "LOGOUT_SUCCESS"
      })
    )
    .catch(error =>
      dispatch({
        type: "LOGOUT_FAILED",
        error: error.message
      })
    );
};

export const signUp = newUser => (dispatch, getState, {
  getFirebase
}) => {

  // console.log(firebase.database());

  //upload the avatar image and get the url

  const storageRef = firebase.storage().ref();
  const mainImage = storageRef.child(newUser.file.name);
  let urlAvatar = '';


  mainImage
    .put(newUser.file)
    .then(snapshot => mainImage.getDownloadURL().then(url => {

      firebase.auth().createUserWithEmailAndPassword(
          newUser.email, newUser.password
        )
        .then(doc => {
          firebase.database().ref(`users/${doc.user.uid}`).set({
            avatar: url,
            email: newUser.email,
            key: doc.user.uid,
            lastVisitAt: firebase.auth().currentUser.metadata.lastSignInTime,
            name: newUser.name,
            registeredAt: new Date().getTime(),
            username: newUser.username,
            usernameLower: newUser.username.toLowerCase()

          })
          console.log('creatd user');
        })
        .then(() => dispatch({
          type: 'REGISTER_SUCCESS'
        }))
        .catch(error => dispatch({
          type: "REGISTER_FAILED",
          error: error
        }))

    }));


};

export const signInWithGoogle = () => (
  dispatch,
  getState, {
    getFirestore,
    getFirebase
  }
) => {


  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(response => {
      console.log(response);
      //later create a user to keep track if user is not created
    })
    .then(() =>
      dispatch({
        type: "LOGIN_SUCCESS_WITH_GOOGLE"
      })
    )
    .catch(error =>
      dispatch({
        type: "LOGIN_FAILED_WITH_GOOGLE",
        error: error.message
      })
    );
};