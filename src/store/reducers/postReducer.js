const INITIAL_STATE = {

  posts: null,
  postCount: {
    threadId: 0,
    postCount: 0
  },

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
      // else return state;
    default:
      return state;
  }

}