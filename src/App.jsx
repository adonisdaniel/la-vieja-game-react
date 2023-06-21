import { useState } from "react"


const TURNS = {
  x: 'X',
  o: 'O'
}

const COMBOS_WINNER = [
  [0,1,2],
  [3,4,5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2,4,6]
]


const Square = ({ children, isSelected, updateBoard, i }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => {
    updateBoard(i);
  }
  
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

function App() {

  const board = Array(9).fill(null)
  const [useBoard, setUseBoard] = useState(board);
  
  const [turn, setTurn] = useState(TURNS.x);

  const [winner, setWinner] = useState(null);

  const updateBoard = (i) => {
    
    if(useBoard[i]) return
    //EVITAR SOBREESCRIBIR

    const newBoard = [...useBoard];
    newBoard[i] = turn;
    setUseBoard(newBoard);
    
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);
    
  }

  return (
    <>
      <main className="board">
        <h1>La vieja</h1>
        <section className="game">
          {
            useBoard.map((_, i) => {
              return (
                <Square
                  key={i}
                  i={i}
                  updateBoard={updateBoard}
                >
                  {useBoard[i]}
                </Square>
              )
            })
          }
        </section>

        <section className="turn">
          <Square isSelected={turn === 'X'}>{ TURNS.x }</Square>
          <Square isSelected={turn === 'O'}>{ TURNS.o }</Square>
        </section>
      </main>
    </>
  )
}

export default App
