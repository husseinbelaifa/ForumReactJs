const INITIAL_STATE = {

}

export const postReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'FETCH_POST':
      if (action.post !== null)
        return {
          ...state,
          [action.post.key]: action.post
        };
    default:
      return state;
  }

}