const INITIAL_STATE = {
  categories: {},
  subCategories: {}
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
      }
    }


    case 'FETCH_SUB_CATEGORY_By_Id': {
      return {
        ...state,
        // subCategories: action.subCategories
        subCategories: {
          ...state.subCategories,
          [action.subCategories.key]: action.subCategories
        }

      };
    }

    case 'FETCH_CATEGORY':
      return {
        ...state,
        // categories: action.category
        categories: {
          ...state.category,
          [action.category.key]: action.category
        }
      }

      case 'FETCH_SUB_CATEGORY_By_CATEGORYID':


        return {
          ...state,
          // subCategories: action.subCategories
          subCategories: {
            ...state.subCategories,
            [action.subCategories.key]: action.subCategories
          }
        }


        default:
          return state;
  }
}