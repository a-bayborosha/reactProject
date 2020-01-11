import React from 'react';
import './Game.css';
import Board from './components/Board/Board'


class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true
    }
  }

  //by Mouse click on Square component
  handleClick(i) {
    //const history <= current state of Squares on the Board
    const history = this.state.history
    
    const current = history[history.length - 1]
    //create copy of the squares array
    const squares = current.squares.slice()
    //ignoring a click if someone has won/square fild is filed
    if (calculateWinner(squares) || squares[i]) {
        return;
    }
    //assigne the xIsNext actual value to [i]- ellement of coppied array 
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    //renew the state
    this.setState({
                    history: history.concat([{
                      squares
                    }]),
                    xIsNext: !this.state.xIsNext})
    
}

  render () {
    const history = this.state.history
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares);

    let status
    if (winner) {
        status = "Winner " + winner
    }   else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    return (
      <div className='game'>
        <div className='game-board'>
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    )
  }
}

function calculateWinner(squares) {
  const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ]
  for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a]
      }
  }
  return null
}

export default Game;
