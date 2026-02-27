//coordinates of a single tile ( goes from example: 6,4 -> e2 )
export function coordsToAlg(row, col) {
    const tiles = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const rank = 8 - row;
    const tile = tiles[col];
    return `${tile}${rank}`
}

//does the reverse
export function algToCoords(square) {
    const tiles = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const tile = square[0];
    const rank = parseInt(square[1]);
    const col = tiles.indexOf(tile);
    const row = 8 - rank;
    return { row, col}
}