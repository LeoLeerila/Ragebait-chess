import Piece from "./Piece";
const Square = ({ square, row, col, piece, onClick, isSelected}) => {
    const isLight = (row + col) % 2 === 0;
    return (
        // Square classname will be either dark or light, and the classname will also change if it's selected
        <div className={`square ${isLight ? "light" : "dark"} ${isSelected ? "selected" : ""}`} 
            onClick={() => onClick(square)}
            id={`${square}`}>
            {piece && <Piece piece={piece} />}
        </div>
    );
}

export default Square;