// ID 63242020

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

function getForwardDistances(list) {
    let lastEmptyIndex;
    let distances = new Array(list.length);

    for (let i = 0; i <= list.length - 1; i++) {
        if (list[i] === 0) {
            lastEmptyIndex = i;
        }

        if (typeof lastEmptyIndex !== 'undefined') {
            distances[i] = i - lastEmptyIndex
        }
    }

    return distances;
}

function getBackwardDistances(list) {
    let lastEmptyIndex;
    let distances = new Array(list.length);

    for (let i = list.length - 1; i >= 0; i--) {
        if (list[i] === 0) {
            lastEmptyIndex = i;
        }

        if (typeof lastEmptyIndex !== 'undefined') {
            distances[i] = lastEmptyIndex - i;
        }
    }

    return distances;
}

function getNeighborDistances(houseList) {
    const forwardDistances = getForwardDistances(houseList)
    const backwardDistances = getBackwardDistances(houseList)

    const result = new Array(houseList.length);

    for (let i = 0; i <= houseList.length; i++) {
        if (typeof backwardDistances[i] === 'undefined') {
            result[i] = forwardDistances[i];
            continue;
        }

        if (typeof forwardDistances[i] === 'undefined') {
            result[i] = backwardDistances[i];
            continue;
        }

        result[i] = forwardDistances[i] < backwardDistances[i]
            ? forwardDistances[i]
            : backwardDistances[i];
    }

    return result;
}

function solve() {
    const length = readInt();
    const houseList = readArray();
    process.stdout.write(`${getNeighborDistances(houseList).join(' ')}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    const arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
