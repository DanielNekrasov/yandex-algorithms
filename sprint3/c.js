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
    let s = readString();
    const t = readString()

    for (let i = 0; i <= t.length - 1; i++) {
        if (t[i] === s[0]) {
            s = s.slice(1);
        }
    }

    process.stdout.write(`${s.length === 0 ? "True": "False"}`)
}

function readString() {
    const n = _inputLines[_curLine];
    _curLine++;
    return n;
}

