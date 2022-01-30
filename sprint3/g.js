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


function countingSort(array, k) {
    const countedValues = new Array(k).fill(0);
    for (let value of array) {
        countedValues[value] += 1
    }

    let index = 0;

    for (let value = 0; value <= k - 1; value++) {
        for (let amount = 1; amount <= countedValues[value]; amount++) {
            array[index] = value
            index++
        }
    }
}

function solve() {
    const number = readInt();
    if (number > 0) {
        const arr = readArray();
        countingSort(arr, 3);

        process.stdout.write(`${arr.join(' ')}`)
    }
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

