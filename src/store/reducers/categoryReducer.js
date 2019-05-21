const INITIAL_STATE = {
  categories: [],
  subCategories: []
};

export const categoryReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'FETCH_CATEGORIES': {

      return {
        ...state,
        categories: action.categories
      };

    }

    case 'FETCH_SUB_CATEGORY': {

      return {
        ...state,
        subCategories: action.subCategories
      };
    }

    case 'fetchSubCategoriesById': {
      return {
        ...state,
        subCategories: action.subCategories

      };
    }

    default:
      return state;
  }
}