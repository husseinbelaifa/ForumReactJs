export const signIn = credential => (
  dispatch,
  getState, {

    getFirebase
  }
) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signInWithEmailAndPassword({
      email: credential.email,
      password: credential.password
    })
    .then(() => dispatch({
      type: "LOGIN_SUCCESS"
    }))
    .catch(error => dispatch({
      type: "LOGIN_FAILED",
      error: error.message
    }));
};

export const signOut = () => (
  dispatch,
  getState, {

    getFirebase
  }
) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signOut()
    .then(() => dispatch({
      type: "LOGOUT_SUCCESS"
    }))
    .catch(error => dispatch({
      type: "LOGOUT_FAILED",
      error: error.message
    }));
};

export const signUp = newUser => (
  dispatch,
  getState, {

    getFirebase
  }
) => {
  const firebase = getFirebase();

  //upload the avatar image and get the url


  firebase
    .auth()
    .createUserWithEmailAndPassword({
      email: newUser.email,
      password: newUser.password
    })
    .then(doc => {
      // return firestore
      //   .database("users")
      //   .doc(doc.user.uid)
      //   .set({
      //     avatar: newUser.avatar,
      //     email: newUser.email,
      //     key: doc.user.uid,
      //     lastVisitAt: firebase.auth().currentUser.metadata.lastSignInTime,
      //     name: `${newUser.firstName} ${newUser.lastName}`,
      //     registeredAt: new Date().getTime(),
      //     username: newUser.username,
      //     usernameLower: newUser.username.toLowerCase()
      //   });
    })
    .then(() => dispatch({
      type: "REGISTER_SUCCESS"
    }))
    .catch(error =>
      dispatch({
        type: "REGISTER_FAILED",
        error: error.message
      })
    );
};

export const signInWithGoogle = () => (
  dispatch,
  getState, {
    getFirestore,
    getFirebase
  }
) => {
  const firebase = getFirebase();


  const provider = firebase.auth().GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(response => {
      //later create a user to keep track if user is not created
    })
    .then(() => dispatch({
      type: "LOGIN_SUCCESS_WITH_GOOGLE"
    }))
    .catch(error =>
      dispatch({
        type: "LOGIN_FAILED_WITH_GOOGLE",
        error: error.message
      })
    );
};