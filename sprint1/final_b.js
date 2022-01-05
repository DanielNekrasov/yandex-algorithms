// ID 63243088

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

function computeMaxPoints(matrix, maxKeys) {
    const counterMap = new Map();
    const numbersList = matrix.flat();
    let points = 0;

    for (let i = 0; i <= numbersList.length - 1; i++) {
        const number = numbersList[i];
        if (!number) {
            continue;
        }

        if (!counterMap.has(number)) {
            counterMap.set(number, 1);
            continue;
        }

        const prevCounter = counterMap.get(number)
        counterMap.set(number, prevCounter + 1);
    }

    counterMap.forEach(value => {
        if (maxKeys >= value) {
            points++;
        }
    })

    return points
}

function solve() {
    const maxKeys = readInt();
    const matrix = readMatrix(4);
    process.stdout.write(`${computeMaxPoints(matrix, maxKeys * 2)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    let arr = _inputLines[_curLine].trim(" ").split("").map(num => Number(num));
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
