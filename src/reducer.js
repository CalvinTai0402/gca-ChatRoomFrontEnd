export const initialState = {
  user: null,
  updateLastMessage: false,
};

export const actionTypes = {
  SET_USER: "SET_USER",
  UPDATE_LAST_MESSAGE: "UPDATE_LAST_MESSAGE",
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.UPDATE_LAST_MESSAGE:
      return {
        ...state,
        updateLastMessage: action.updateLastMessage,
      };
    default:
      return state;
  }
};

export default reducer;
