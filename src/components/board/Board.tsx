import { useEffect, useState } from "react";

import type { Winner } from "../../types/Winner";
import { checkWinner } from "../../utils/checkWinner";
import Cell from "../cell/Cell";
import "./Board.css";
import type { Move } from "../../types/Move";

interface Props {
  boardSize: number;
  isGameOn: boolean;
  isPlayerX: boolean;
  moves: Move[];
  setMoves: (moves: Move[]) => void;
  setWinner: (winner: Winner) => void;
  setIsGameOn: (isGameOn: boolean) => void;
}

const MyComponent = (props: Props) => {
  const {
    boardSize,
    isGameOn,
    isPlayerX,
    moves,
    setMoves,
    setIsGameOn,
    setWinner,
  } = props;

  const [isTurnX, setIsTurnX] = useState(true);

  useEffect(() => {
    setIsTurnX(true);
  }, [isGameOn]);

  const makeComputerMove = () => {
    if (!isGameOn) {
      return;
    }

    if ((isPlayerX && isTurnX) || (!isPlayerX && !isTurnX)) {
      return;
    }

    const emptyCellIndexes = moves
      .map((move, index) => (move === undefined ? index : null))
      .filter((move) => move !== null);

    if (emptyCellIndexes.length <= 0) {
      return;
    }

    const randomCellIndex =
      emptyCellIndexes[Math.floor(Math.random() * emptyCellIndexes.length)];

    const newMoves = [...moves];
    newMoves[randomCellIndex] = isPlayerX ? "O" : "X";
    setMoves(newMoves);

    const winner = checkWinner(boardSize, newMoves);

    if (winner) {
      setWinner(winner);
      setIsGameOn(false);
    } else {
      setIsTurnX((prev) => !prev);
    }
  };

  useEffect(() => {
    if (!isGameOn) {
      return;
    }

    const timer = setTimeout(makeComputerMove, 500);
    return () => clearTimeout(timer);
  }, [isGameOn, moves]);

  const handleCellClick = (cellIndex: number) => {
    if (!isGameOn) {
      return;
    }

    if ((isPlayerX && !isTurnX) || (!isPlayerX && isTurnX)) {
      return;
    }

    if (moves[cellIndex] || moves.every((cell) => cell !== undefined)) {
      return;
    }

    const newMoves = [...moves];
    newMoves[cellIndex] = isPlayerX ? "X" : "O";
    setMoves(newMoves);

    const winner = checkWinner(boardSize, newMoves);

    if (winner) {
      setWinner(winner);
      setIsGameOn(false);
    } else {
      setIsTurnX((prev) => !prev);
    }
  };

  return (
    <div className="board">
      {moves.map((move, index) => (
        <Cell key={index} value={move} onClick={() => handleCellClick(index)} />
      ))}
    </div>
  );
};

export default MyComponent;
