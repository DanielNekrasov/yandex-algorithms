const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin
});

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    _inputLines.push(line);
});

process.stdin.on('end', solve);

function transpose(matrix, rowsCount, colsCount) {
    let transposed = Array.from(new Array(colsCount), () => new Array(rowsCount));

    for (let i = 0; i <= rowsCount - 1; i++) {
        for (let j = 0; j <= colsCount - 1; j++) {
            transposed[j][i] = matrix[i][j]
        }
    }

    return transposed;
}

function solve() {
    const rowsCount = readInt();
    const colsCount = readInt();
    const matrix = readMatrix(rowsCount);
    const transposed = transpose(matrix, rowsCount, colsCount);
    writeMatrix(transposed)
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    let arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}

function readMatrix(rowsCount) {
    let arr = [];
    for (let i = 0; i !== rowsCount; i++) {
        arr.push(readArray())
    }
    return arr;
}

function writeMatrix(matrix) {
    for (let i = 0; i <= matrix.length - 1; i++) {
        process.stdout.write(`${matrix[i].join(' ')}`)
        process.stdout.write("\n");
    }
}
