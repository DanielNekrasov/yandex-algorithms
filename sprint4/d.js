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
    const n = readInt();
    let log = [];

    for (let i = 0; i < n; i++) {
        log.push(readString());
    }

    const circles = new Set(log);
    circles.forEach(c => {
        console.log(c);
    });

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
