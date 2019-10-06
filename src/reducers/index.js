import { combineReducers } from 'redux';
import history from './history';
import moveChoose from './moveChoose';
import sortMovesAsc from './sortMovesAsc';
import stepNumber from './stepNumber';
import wasWin from './wasWin';
import winner from './winner';
import xIsNext from './xIsNext';

export default combineReducers({
  history,
  moveChoose,
  sortMovesAsc,
  stepNumber,
  wasWin,
  winner,
  xIsNext
});
