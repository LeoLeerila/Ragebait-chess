import Piece from "./Piece";
const Square = ({ row, col, piece}) => {
    const isLight = (row + col) % 2 === 0;
    return (
        <div className={`square ${isLight ? "light" : "dark"}`}>
            {piece && <Piece piece={piece} />}
        </div>
    );
}

export default Square;