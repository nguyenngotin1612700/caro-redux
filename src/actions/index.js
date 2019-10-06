export const addCheck = (squares, type, position) => ({
  type: 'ADD_CHECK',
  payload: {
    squares,
    type,
    position
  }
});

export const changeAllHistory = history => ({
  type: 'CHANGE_HISTORY',
  payload: {
    history
  }
});

export const changeStepNumber = stepNumber => ({
  type: 'CHANGE_STEPNUMBER',
  payload: {
    stepNumber
  }
});

export const addWin = winner => ({
  type: 'ADD_WINNER',
  payload: {
    winner
  }
});

export const addWasWin = wasWin => ({
  type: 'ADD_WAS_WIN',
  payload: {
    wasWin
  }
});

export const toggleSortMove = () => ({
  type: 'TOGGLE_MOVE_SORT',
  payload: {}
});

export const setSortMoveAsc = () => ({
  type: 'SET_SORT_MOVE_ASC',
  payload: {}
});

export const chooseMove = step => ({
  type: 'CHOOSE_MOVE',
  payload: {
    step
  }
});

export const toggleXIsNext = () => ({
  type: 'TOGGLE_XISNEXT',
  payload: {}
});

export const setXIsNext = xIsNext => ({
  type: 'SET_XISNEXT',
  payload: {
    xIsNext
  }
});
