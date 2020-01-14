import React from 'react';
import './Game.css';
import Board from './components/Board/Board'


class Game extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      history: [
        {
        squares: Array(9).fill(null)
        }
    ],
      stepNumber: 0,
      xIsNext: true
    }
  }

  //by Mouse click on Square component
  handleClick(i) {
    //const history <= previous board view as array
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    //console.log(history, this.state.stepNumber + 1)

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
                    history: history.concat([
                      {
                      squares
                      }
                    ]),
                    stepNumber: history.length,
                    xIsNext: !this.state.xIsNext
                  })
    
}
jumpTo(step) {
  this.setState({
    stepNumber: step,
    xIsNext: (step % 2) === 0,
  })
}

  render () {
    //const history <= adding array with changes of every move (starting before first move)
    const history = this.state.history
    console.log(history)
    //acces to last (current) board view (last move) (as Object)
    const current = history[this.state.stepNumber]
    console.log(current)
    const winner = calculateWinner(current.squares);

    const moves = history.map((step,move) => {
      const desc = move       ?
        'Go to move #' + move :
        'Go to game start'
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
    })

    let status
    if (winner) {
        status = "Winner: " + winner
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
          <ol>{moves}</ol>
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
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        //if 'X' or 'O' won
          return squares[a]
      }
      
  }
  //if no one won
  return null
}

export default Game;
