const INITIAL_STATE = {
  currentUser: null,
  userForum: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_USER": {
      return {
        ...state,
        currentUser: action.user
      };
    }

    case 'FETCH_USER_Forum': {

      return {
        ...state,
        userForum: {
          ...state.userForum,
          [action.userForum.postId]: action.userForum
        }
      };


    }
    // case "FETCH_USER_ERROR":
    //   return { ...state, erroFetchUser: action.error };
    default:
      return state;
  }
};