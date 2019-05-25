const INITIAL_STATE = {

  posts: null,
  postCount: {
    threadId: 0,
    postCount: 0
  },

  postCountUser: {
    userId: 0,
    postCount: 0
  },

  postsThread: null

}

export const postReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'FETCH_POST':
      // if (action.post !== null)
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.post.key]: action.post
        }
      };

    case 'FETCH_POSTS_THREAD':
      return {
        ...state,
        postsThread: {
          ...state.postsThread,
          [action.post.threadId]: action.post
        }
      }

      // else return state;

      case 'COUNT_POSTS':
        // if (action.post !== null)
        return {
          ...state,
          postCount: {
            ...state.postCount,
            [action.post.threadId]: action.post
          }

        };

      case 'COUNT_POSTS_USER': {

        return {
          ...state,
          postCountUser: {
            ...state.postCountUser,
            [action.post.userId]: action.post
          }

        };

      }
      // else return state;
      default:
        return state;
  }

}