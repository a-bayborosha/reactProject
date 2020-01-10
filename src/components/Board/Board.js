import React from 'react'
import Square from '../Square/Square'
import './Board.css'

class Board extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }

    //by Mouse click on Square component
    handleClick(i) {
        //create copy of the squares array
        const squares = this.state.squares.slice()
        //ignoring a click if someone has won/square fild is filed
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        //assigne the xIsNext actual value to [i]- ellement of coppied array 
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        //renew the state
        this.setState({
                        squares,
                        xIsNext: !this.state.xIsNext})
        
    }

    //rendering Square component
    renderSquare(i) {
        return <Square 
                    value={this.state.squares[i]}
                    onClick={() => this.handleClick(i)}
                />
    }
    render() {
    const winner = calculateWinner(this.state.squares);
    let status
    if (winner) {
        status = "Winner " + winner
    }   else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }
    

        return(
            <div>
                <div className='status'>{status}</div>

                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>

                <div className='board-row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>

                <div className='board-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
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

export default Board