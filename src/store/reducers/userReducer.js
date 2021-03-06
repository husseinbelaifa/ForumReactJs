const INITIAL_STATE = {
  currentUser: null,
  userForum: null,
  userThread: null,
  userPost: null,
  userProfile: null,
  userCount: 0,
  moderator: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_USER": {
      return {
        ...state,
        currentUser: action.user
      };
    }

    case 'MODERATOR_OK':
      return {
        ...state,
        moderator: "ok"
      }

      case 'FETCH_USER_PROFILE': {
        return {
          ...state,
          userProfile: {
            ...state.userProfile,
            [action.user.userId]: action.user
          }
        }
      }

      case 'COUNT_USER_FOOTER':
        return {
          ...state,
          userCount: action.userCount
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

        case 'FETCH_USER_THREAD': {




          return {
            ...state,
            userThread: {
              ...state.userThread,
              [action.userThread.threadId]: action.userThread
            }
          };



        }

        case 'FETCH_USER_POST': {

          return {
            ...state,
            userPost: {
              ...state.userPost,
              [action.userPost.postId]: action.userPost
            }
          };


        }

        default:
          return state;
  }
};