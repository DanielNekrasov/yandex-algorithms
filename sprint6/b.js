const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin
})

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    _inputLines.push(line);
})

process.stdin.on('end', solve);

function solve() {
    const [n, m] = readArray();
    let edges = [];
    for (let i = 0; i < m; i++) {
        edges.push(readArray());
    }

    let matrix = Array.from(Array(n), () => Array.from(Array(n), () => 0));

    edges.forEach(([u, v]) => {
        matrix[u - 1][v - 1] = 1;
    });

    matrix.forEach(row => {
        console.log(row.join(' '));;
    });
}

function readArray() {
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
