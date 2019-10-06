const initialState = true;

const xIsNext = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_XISNEXT':
      return !state;
    case 'SET_XISNEXT':
      return action.payload.xIsNext;
    default:
      return state;
  }
};
export default xIsNext;
