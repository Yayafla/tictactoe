import { useState } from "react";

import "./App.css";
import Board from "./components/board/Board";
import type { Winner } from "./types/Winner";
import type { Move } from "./types/Move";

function App() {
  const boardSize = 3;
  const totalCells = boardSize * boardSize;

  const [isGameOn, setIsGameOn] = useState(false);
  const [isPlayerX, setIsPlayerX] = useState(true);
  const [winner, setWinner] = useState<Winner>();
  const [moves, setMoves] = useState<Move[]>(Array(totalCells).fill(undefined));

  const handleSideButtonClick = () => {
    setIsPlayerX((prev) => !prev);
  };

  const handleStartButtonClick = () => {
    setWinner(undefined);
    setMoves(Array(totalCells).fill(undefined));
    setIsGameOn((prev) => !prev);
  };

  return (
    <main className="container">
      <h1>Tic Tac Toe - Easi</h1>
      <p>Current side: {isPlayerX ? "X" : "O"}</p>
      <div className="container">
        <button
          className="btn"
          onClick={handleSideButtonClick}
          disabled={isGameOn}
        >
          Change side
        </button>
        <Board
          boardSize={boardSize}
          isGameOn={isGameOn}
          isPlayerX={isPlayerX}
          moves={moves}
          setMoves={setMoves}
          setIsGameOn={setIsGameOn}
          setWinner={setWinner}
        />
        <button
          className={`btn ${isGameOn ? "stop-btn" : "start-btn"}`}
          onClick={handleStartButtonClick}
        >
          {isGameOn ? "STOP" : winner ? "RESTART" : "START"}
        </button>
        {winner && <p>{winner === "Draw" ? "Draw" : `Winner: ${winner}`}</p>}
      </div>
    </main>
  );
}

export default App;
