const INITIAL_STATE = {

};

export const threadReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'COUNT_THREAD':
      return {
        ...state, [action.thread.forumId]: action.thread
        // threadCount: action.threadCount
      };
    default:
      return state;
  }

}