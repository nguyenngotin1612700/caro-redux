// eslint-disable-next-line import/no-unresolved
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Board from './Board';

class Game extends React.Component {
  handlePlayAgain = () => {
    const {
      changeAllHistory,
      changeStepNumber,
      addWin,
      addWasWin,
      setSortMoveAsc,
      chooseMove,
      setXIsNext
    } = this.props;
    changeAllHistory([
      {
        squares: Array(400).fill(null),
        type: null,
        pos: -1
      }
    ]);
    changeStepNumber(0);
    addWin(null);
    addWasWin(null);
    setSortMoveAsc();
    chooseMove(-1);
    setXIsNext(true);
  };

  handleSortMove = () => {
    const { toggleSortMove } = this.props;
    toggleSortMove();
  };

  handleClick(i) {
    const {
      winner,
      xIsNext,
      stepNumber,
      changeAllHistory,
      addCheck,
      changeStepNumber,
      chooseMove,
      addWin,
      addWasWin,
      toggleXIsNext
    } = this.props;
    let { history } = this.props;
    const initLength = history.length;
    history = history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] || winner) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    const checkWin = this.calculateWinner(squares, i);
    if (stepNumber < initLength - 1) {
      changeAllHistory(history);
    }
    addCheck(squares, squares[i], i);
    changeStepNumber(history.length);
    chooseMove(-1);
    if (checkWin) {
      addWin(checkWin);
      addWasWin(checkWin);
    } else {
      addWasWin(null);
      toggleXIsNext();
    }
  }

  jumpTo(step) {
    const {
      wasWin,
      history,
      changeStepNumber,
      setXIsNext,
      addWin,
      chooseMove
    } = this.props;
    addWin(wasWin && step === history.length - 1 ? wasWin : null);
    changeStepNumber(step);
    setXIsNext(step % 2 === 0);
    addWin(wasWin && step === history.length - 1 ? wasWin : null);
    chooseMove(step);
  }

  calculateWinner(squares, lastNode) {
    return (
      this.checkNgang(squares, lastNode) ||
      this.checkDoc(squares, lastNode) ||
      this.checkCheoChinh(squares, lastNode) ||
      this.checkCheoPhu(squares, lastNode)
    );
  }

  // eslint-disable-next-line class-methods-use-this
  checkNgang(squares, lastNode) {
    const hang = parseInt(lastNode / 20, 10);
    const cot = lastNode % 20;
    let count = 0;
    let chanTrai = false;
    let chanPhai = false;
    const posWin = [lastNode];
    // check Trái
    for (let i = cot - 1; i >= 0; i -= 1) {
      if (squares[hang * 20 + i] === squares[lastNode]) {
        count += 1;
        posWin.push(hang * 20 + i);
      } else if (squares[hang * 20 + i] !== null) {
        chanTrai = true;
        break;
      } else {
        break;
      }
    }

    // check Phải
    for (let i = cot + 1; i <= 19; i += 1) {
      if (squares[hang * 20 + i] === squares[lastNode]) {
        count += 1;
        posWin.push(hang * 20 + i);
      } else if (squares[hang * 20 + i] !== null) {
        chanPhai = true;
        break;
      } else {
        break;
      }
    }
    if (count >= 4 && (!chanTrai || !chanPhai)) {
      return {
        winner: squares[lastNode],
        posWin
      };
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  checkDoc(squares, lastNode) {
    const hang = parseInt(lastNode / 20, 10);
    const cot = lastNode % 20;
    let count = 0;
    let chanTren = false;
    const chanDuoi = false;
    const posWin = [lastNode];
    // check Trên
    for (let i = hang + 1; i <= 19; i += 1) {
      if (squares[i * 20 + cot] === squares[lastNode]) {
        count += 1;
        posWin.push(i * 20 + cot);
      } else if (squares[i * 20 + cot] !== null) {
        chanTren = true;
        break;
      } else {
        break;
      }
    }
    // check Dưới
    for (let i = hang - 1; i >= 0; i -= 1) {
      if (squares[i * 20 + cot] === squares[lastNode]) {
        count += 1;
        posWin.push(i * 20 + cot);
      } else if (squares[i * 20 + cot] !== null) {
        chanTren = true;
        break;
      } else {
        break;
      }
    }
    if (count >= 4 && (!chanTren || !chanDuoi)) {
      return {
        winner: squares[lastNode],
        posWin
      };
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  checkCheoChinh(squares, lastNode) {
    const hang = parseInt(lastNode / 20, 10);
    let cot = lastNode % 20;
    let count = 0;
    let chanTren = false;
    let chanDuoi = false;
    const posWin = [lastNode];
    // check dưới
    for (let temp = hang - 1; temp >= 0; temp -= 1) {
      cot -= 1;
      if (squares[temp * 20 + cot] === squares[lastNode]) {
        count += 1;
        posWin.push(temp * 20 + cot);
      } else if (squares[temp * 20 + cot] !== null) {
        chanDuoi = true;
        cot = lastNode % 20;
        break;
      } else {
        cot = lastNode % 20;
        break;
      }
    }

    // check trên
    for (let temp = hang + 1; temp <= 20; temp += 1) {
      cot += 1;
      if (squares[temp * 20 + cot] === squares[lastNode]) {
        count += 1;
        posWin.push(temp * 20 + cot);
      } else if (squares[temp * 20 + cot] != null) {
        chanTren = true;
        cot = lastNode % 20;
        break;
      } else {
        cot = lastNode % 20;
        break;
      }
    }

    if (count >= 4 && (!chanTren || !chanDuoi)) {
      return {
        winner: squares[lastNode],
        posWin
      };
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  checkCheoPhu(squares, lastNode) {
    const hang = parseInt(lastNode / 20, 10);
    let cot = lastNode % 20;
    let count = 0;
    let chanTren = false;
    let chanDuoi = false;
    const posWin = [lastNode];
    // check dưới
    for (let temp = hang - 1; temp >= 0; temp -= 1) {
      cot += 1;
      if (squares[temp * 20 + cot] === squares[lastNode]) {
        count += 1;
        posWin.push(temp * 20 + cot);
      } else if (squares[temp * 20 + cot] != null) {
        chanDuoi = true;
        cot = lastNode % 20;
        break;
      } else {
        cot = lastNode % 20;
        break;
      }
    }
    // check trên
    for (let temp = hang + 1; temp <= 20; temp += 1) {
      cot -= 1;
      if (squares[temp * 20 + cot] === squares[lastNode]) {
        count += 1;
        posWin.push(temp * 20 + cot);
      } else if (squares[temp * 20 + cot] != null) {
        chanTren = true;
        cot = lastNode % 20;
        break;
      } else {
        cot = lastNode % 20;
        break;
      }
    }
    if (count >= 4 && (!chanTren || !chanDuoi)) {
      return {
        winner: squares[lastNode],
        posWin
      };
    }
    return null;
  }

  render() {
    const {
      history,
      stepNumber,
      winner,
      xIsNext,
      moveChoose,
      sortMovesAsc
    } = this.props;
    const current = history[stepNumber];
    let status;
    if (winner) {
      status = `Player ${winner.winner} Winnnnnnnnn, Click play again to continues `;
    } else {
      status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
    const moves = history.map((move, idx) => {
      const desc = idx
        ? `go to move ${idx} -- ${move.type} check in (${Math.floor(
            move.pos / 20
          ) + 1}, ${(move.pos % 20) + 1}) `
        : 'go to game start';
      const fontWeight = moveChoose === idx ? 'bold' : 'normal';
      return (
        <li>
          <button
            type="button"
            style={{ fontWeight }}
            onClick={() => this.jumpTo(idx)}
            className="btn btn-outline-success"
          >
            {desc}
          </button>
        </li>
      );
    });
    if (!sortMovesAsc) {
      moves.reverse();
    }

    return (
      <div className="game">
        <div className="game-info">
          <div>Nguyễn Ngô Tín - 1612700</div>
          <div>Phát triển ứng dụng web nâng cao</div>
        </div>
        <div className="game-board">
          <Board
            squares={current.squares}
            posWin={winner ? winner.posWin : null}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleSortMove}
          >
            Sort Moves
          </button>
          <ol>{moves}</ol>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.handlePlayAgain}
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
}
export default Game;
