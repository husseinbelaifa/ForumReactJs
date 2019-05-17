const INITIAL_STATE = {
   auth_error: null
}

const authReducer = (state = INITIAL_STATE, action) => {

   switch (action.type) {
      case 'LOGIN_SUCCESS':
         return {
            ...state,
            auth_error: null
         };

      case 'LOGIN_FAILED':
         return {
            ...state,
            auth_error: action.error
         };

      case 'LOGOUT_SUCCESS':
         return {
            ...state, auth_error: null
         };
      case 'LOGOUT_FAILED':
         return {
            ...state, auth_error: action.error
         }

         case 'REGISTER_SUCCESS':
            return {
               ...state,
               auth_error: null
            };

         case 'REGISTER_FAILED':
            return {
               ...state,
               auth_error: action.error
            };

         case 'LOGIN_SUCCESS_WITH_GOOGLE':
            return {
               ...state,
               auth_error: null
            };

         case 'LOGIN_FAILED_WITH_GOOGLE':
            return {
               ...state,
               auth_error: action.error
            };

         default:
            return state;
   }
}

export default authReducer;