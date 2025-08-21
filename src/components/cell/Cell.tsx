import "./Cell.css";
import type { Move } from "../../types/Move";

interface Props {
  value: Move;
  onClick: () => void;
}

const Cell = (props: Props) => {
  const { value, onClick } = props;

  return (
    <div className="cell" onClick={onClick}>
      {value === "O" && (
        <img className="image" src="/circle.png" alt="O" title="O" />
      )}
      {value === "X" && (
        <img className="image" src="/x.png" alt="X" title="X" />
      )}
    </div>
  );
};

export default Cell;
