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
    const _number = readInt();
    const sides = readArray();
    process.stdout.write(`${maxPerimetr(sides)}`);
}

function maxPerimetr(sidesArr) {
    const sortedSided = sidesArr.sort((a, b) => a - b);
    let i = 0;
    let P = 0;

    while (i <= sortedSided.length - 3) {
        if (sortedSided[i] !== 0 && sortedSided[i] + sortedSided[i + 1] > sortedSided[i + 2]) {
            P = sortedSided[i] + sortedSided[i + 1] + sortedSided[i + 2];
        }

        i++;
    }

    return P;
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
