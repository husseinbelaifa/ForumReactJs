const INITIAL_STATE = {

  thread: {
    forumId: 0,
    threadCount: 0
  },
  threadPost: null
};

export const threadReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'COUNT_THREAD':
      return {
        ...state, [action.thread.forumId]: action.thread
        // threadCount: action.threadCount
      };

    case 'FETCH_THREAD':
      return {
        ...state, threadPost: {
          ...state.threadPost,
          [action.thread.key]: action.thread
        }
      };
    default:
      return state;
  }

}