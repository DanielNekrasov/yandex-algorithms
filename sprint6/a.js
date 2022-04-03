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

    let values = new Array(n).fill([]);

    edges.forEach(([u,v]) => {
        values[u - 1] = [...values[u - 1], v];
    })

    values.forEach(v => {
        process.stdout.write(`${v.length} ${v ? v.join(' '): 0} \n`);
    })
}

function readArray() {
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
