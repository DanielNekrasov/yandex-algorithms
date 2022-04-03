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

    const list = buildList(n, edges);

    function isFull(list) {
        for (let i of list) {
            if (list.length - i.size !== 1 ) {
                return false;
            }
        }

        return true;
    }

    console.log(isFull(list) ? 'YES' : 'NO');
}

function buildList(n, edges) {
    let list = Array.from(new Array(n), () => new Set());

    edges.forEach(([u, v]) => {
        if (v !== u) {
            list[u - 1].add(v - 1);
            list[v - 1].add(u - 1);
        }
    });

    return list;
}


function readArray() {
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
