import React, {useState} from 'react';
import './app.css';


export default function App() {
    return(
        <div>
           <GameManager />
        </div>
    )
}


const GameManager = () => {
    // Initialize state
    const [playerNext, setPlayerNext] = useState(true);
    const [position, setPosition] = useState(Array(9).fill(null));
    
    const handleClick = (i) => {
        console.log(i)
        const copyPosition = [...position];
        // copyPosition[i] = xIsNext ? 'x' : 'o';
        if (playerNext) {
            copyPosition[i] = "X";
            setPlayerNext(false);
        }
        else {
           moveAI(copyPosition,i);
        }
        // update position
        setPosition(copyPosition);
        console.log(copyPosition)
    } 

    const moveAI = (copyPosition, i) => {
        copyPosition[i] = "0";
        setPlayerNext(true);
    }

    return (
        <Board position={position} onClick={handleClick}/>
    );
}


const style = {
    border: '2px solid black',
    width: '250px',
    height: '250px',
    margin: '0 auto',
    display: 'grid',
    gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)'
};
    

// Board: This will take in the current state, print out the empty board and the overall board layout and styling, and then iterate over the board in state, and add in a Tile component for each tile in the board.
const Board = (props) => {
    const {position, onClick} = props;

    return (
        <div style={style}>
            {position.map((square, i) => (
                <Tile   
                    key={i}
                    value={square}
                    position={i}
                    onClick={onClick}
                />
            ))
            }
        </div>
    );
}


// Tile: The tile’s job is to print out the state passed in, i.e. empty, O, X. It will also handle click events by passing them through to an onClick handler (that might have to be thread through the Board)
const Tile = (props) => {
    const {position, value, onClick} = props; 
    return (
        <div onClick={() => onClick(position)} 
            style={{border:'2px solid black'}}>
          {position} {value}
        </div>
    )
}