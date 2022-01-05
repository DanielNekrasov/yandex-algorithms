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

function getExcessiveLetter(firstLine, secondLine) {
    let result = secondLine;
    for (let i = 0; i <= firstLine.length - 1; i++) {
        const letterFrom1st = firstLine[i];
        const indexIn2nd = result.indexOf(letterFrom1st);
        if (indexIn2nd > -1) {
            result = result.slice(0, indexIn2nd) + result.slice(indexIn2nd + 1);
        }
    }
    return result;
}

function solve() {
    const firstLine = readLine();
    const secondLine = readLine();
    process.stdout.write(`${getExcessiveLetter(firstLine, secondLine)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}

function readLine() {
    const line = _inputLines[_curLine];
    _curLine++;
    return line;
}
