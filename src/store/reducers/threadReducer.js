const INITIAL_STATE = {

  thread: {
    forumId: 0,
    threadCount: 0
  },
  threadCountUser: {
    userId: 0,
    postCount: 0
  },
  threadPost: null,
  threadCategorie: null
};

export const threadReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'COUNT_THREAD':
      return {
        ...state, [action.thread.forumId]: action.thread
        // threadCount: action.threadCount
      };

    case 'COUNT_THREAD_USER':
      return {
        ...state,
        threadCountUser: {
          ...state.threadCountUser,
          [action.thread.userId]: action.thread
        }
        // threadCount: action.threadCount
      };

    case 'FETCH_THREAD':
      return {
        ...state, threadPost: {
          ...state.threadPost,
          [action.thread.key]: action.thread
        }
      };

    case 'FETCH_THREAD_BY_FORUM':
      return {
        ...state, threadCategorie: action.thread

      }
      default:
        return state;
  }

}