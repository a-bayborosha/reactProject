import React from 'react'
import './Square.css'

const styles = {
    background: '#fff',
    border:' 1px solid #999',
    float: 'left',
    fontSize: '24px',
    fontWeight: 'bold',
    lineHeight: '34px',
    height: '34px',
    marginRight: '-1px',
    marginTop: '-1px',
    padding: 0,
    textAlign: 'center',
    width: '34px',
    cursor: 'pointer'
}


function Square(props){
    return(
        <button 
            style={styles}
            className='square' 
            onClick={props.onClick}
        >
            {props.value}
        </button>
        )
}

export default Square
