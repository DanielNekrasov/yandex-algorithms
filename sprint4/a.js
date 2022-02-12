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

function solve() {
    const a = readInt();
    const m = readInt();
    const str = readString();
    process.stdout.write(`${hash(str, a, m)}`);
}

function hash(str, a, m) {
    let sum = 0;
    const n = str.length;
    for (let i = 0; i < n; i++) {
        sum = (sum * a + str.charCodeAt(i)) % m;
    }
    return sum;
}

function readString() {
    const n = _inputLines[_curLine];
    _curLine++;
    return n;
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

