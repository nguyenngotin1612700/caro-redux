import { connect } from 'react-redux';
import Game from '../components/Game';

import {
  changeAllHistory,
  addCheck,
  changeStepNumber,
  addWin,
  addWasWin,
  toggleSortMove,
  chooseMove,
  toggleXIsNext,
  setXIsNext,
  setSortMoveAsc
} from '../actions';

const mapStateToProps = state => ({
  history: state.history,
  stepNumber: state.stepNumber,
  xIsNext: state.xIsNext,
  winner: state.winner,
  wasWin: state.wasWin,
  sortMovesAsc: state.sortMovesAsc,
  moveChoose: state.moveChoose
});

const mapDispatchToProps = dispatch => ({
  changeAllHistory: history => dispatch(changeAllHistory(history)),
  addCheck: (squares, type, position) =>
    dispatch(addCheck(squares, type, position)),
  changeStepNumber: stepNumber => dispatch(changeStepNumber(stepNumber)),
  addWin: winner => dispatch(addWin(winner)),
  addWasWin: wasWin => dispatch(addWasWin(wasWin)),
  toggleSortMove: () => dispatch(toggleSortMove()),
  setSortMoveAsc: () => dispatch(setSortMoveAsc()),
  chooseMove: step => dispatch(chooseMove(step)),
  toggleXIsNext: () => dispatch(toggleXIsNext()),
  setXIsNext: xIsNext => dispatch(setXIsNext(xIsNext))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
