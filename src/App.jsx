import { useEffect, useState } from "react"


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

const isWinner = (board) => {
  let winner = false;
  let winnerX = false;
  for (let i = 0; i < COMBOS_WINNER.length; i++){
    const combo = COMBOS_WINNER[i];
    if(winner) break
    let counterX = 0;
    let counterY = 0;
    for (let j = 0; j < combo.length; j++){
      const index = combo[j];
      
      if (board[index] === TURNS.x) {
        counterX++
        if (counterX === 3) {
          winner = true;
          winnerX = true;
          break
        }
      }

      if (board[index] === TURNS.o) {
        counterY++
        if (counterY === 3) {
          winner = true;
          break
        }
      }
    }
  }

  if (!winner) return null

  if (!winnerX) return false
  
  return true
}

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
    
    if(typeof winner === 'boolean') return

    if(useBoard[i]) return
    //EVITAR SOBREESCRIBIR

    const newBoard = [...useBoard];
    newBoard[i] = turn;
    setUseBoard(newBoard);
    
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x;
    setTurn(newTurn);
    
  }

  const playAgain = () => {
    setTurn(TURNS.x);
    setWinner(null);
    setUseBoard(board);
  }

  useEffect(() => {
    const winner = isWinner(useBoard);
    setWinner(winner);
  },[useBoard])

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
                  winner={winner}
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

        <section className={typeof winner === 'boolean' ? 'winner' : ''}>
          {
            winner === null
              ? ''
              : winner === true
                ? <h2 className="win"><p className="text" onClick={playAgain}>GANA X</p></h2>
                : <h2 className="win"><p className="text" onClick={playAgain}>GANA O</p></h2>
          }
        </section>
      </main>
    </>
  )
}

export default App
