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

function commitsOfUser(i) {
    if (i === 0 || i === 1) {
        return 1;
    }

    return commitsOfUser(i - 1) + commitsOfUser(i - 2)
}

function solve() {
    const n = readInt();
    process.stdout.write(`${commitsOfUser(n)}`)
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}
