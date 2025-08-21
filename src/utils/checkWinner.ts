import type { Move } from "../types/Move";
import type { Winner } from "../types/Winner";

export const checkWinner = (size: number, moves: Move[]): Winner => {
  for (let row = 0; row < size; row++) {
    const start = row * size;
    const rowCells = moves.slice(start, start + size);
    if (rowCells.every((cell) => cell && cell === rowCells[0])) {
      return rowCells[0];
    }
  }

  for (let col = 0; col < size; col++) {
    const colCells: Move[] = [];
    for (let row = 0; row < size; row++) {
      colCells.push(moves[row * size + col]);
    }
    if (colCells.every((cell) => cell && cell === colCells[0])) {
      return colCells[0];
    }
  }

  const diagonal: Move[] = [];
  for (let i = 0; i < size; i++) {
    diagonal.push(moves[i * size + i]);
  }

  if (diagonal.every((cell) => cell && cell === diagonal[0])) {
    return diagonal[0];
  }

  const antiDiagonal: Move[] = [];
  for (let i = 0; i < size; i++) {
    antiDiagonal.push(moves[i * size + (size - 1 - i)]);
  }

  if (antiDiagonal.every((cell) => cell && cell === antiDiagonal[0])) {
    return antiDiagonal[0];
  }

  if (moves.every((cell) => cell !== undefined)) {
    return "Draw";
  }

  return undefined;
};
