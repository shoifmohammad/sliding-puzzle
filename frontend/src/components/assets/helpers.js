export const isSolvable = (tiles, dimension) => {

    let product = 1;
    for (let i = 1, l = dimension * dimension - 1; i <= l; i++) {
        for (let j = i + 1, m = l + 1; j <= m; j++) {
            product *= (tiles[i - 1] - tiles[j - 1]) / (i - j);
        }
    }
    if(Math.round(product) === 1) {
        return true;
    } else {
        return false;
    }
}

const getBaseURL = (url) => {
    const array = url.split("?")[0].split("/");
    const baseURL = array[0];
    return baseURL+"/gamepage";
}

export const updateURL = (isStarted, tiles) => {
    if(isStarted && isSolved(tiles)) {
        window.history.replaceState("", "", getBaseURL(window.location.href)+"?completed=true");
    } else {
        window.history.replaceState("", "", getBaseURL(window.location.href));
    }
}

export const isSolved = (tiles) => {

    for (let i = 0, l = tiles.length; i < l; i++) {
        if (tiles[i] !== i) {
            return false;
        }
    }
    return true;
}

export function getIndex(dimension, row, col) {
    
    return parseInt(row, 10) * dimension + parseInt(col, 10);
}

export function getMatrixPosition(dimension, index) {
    
    return {
        row: Math.floor(index / dimension),
        col: index % dimension,
    };
}

export function getVisualPosition(row, col, width, height) {
    
    return {
        x: col * width,
        y: row * height,
    };
}

export function shuffle(tiles, dimension) {
    
    // const shuffledTiles = [
    //     ...tiles
    //         .filter((t) => t !== tiles.length - 1)
    //         .sort(() => Math.random() - 0.5),
    //     tiles.length - 1,
    // ];
    // return isSolvable(shuffledTiles, dimension) && !isSolved(shuffledTiles)
    //     ? shuffledTiles
    //     : shuffle(shuffledTiles);

    while(true) {
        const shuffledTiles = [
            ...tiles
                .filter((t) => t !== tiles.length - 1)
                .sort(() => Math.random() - 0.5),
            tiles.length - 1,
        ];
        if(isSolvable(shuffledTiles, dimension) && !isSolved(shuffledTiles))
            return shuffledTiles;
    }
}

export function canSwap(dimension, src, dest) {
    
    const { row: srcRow, col: srcCol } = getMatrixPosition(dimension, src);
    const { row: destRow, col: destCol } = getMatrixPosition(dimension, dest);
    return Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1;
}

export function swap(tiles, src, dest) {
    
    const tilesResult = [...tiles];
    [tilesResult[src], tilesResult[dest]] = [tilesResult[dest], tilesResult[src]];
    return tilesResult;
}