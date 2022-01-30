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
    const daysCount = readInt();
    const progress = readArray();
    const price = readInt();

    const dayX = binarySearch(progress, price,  0, progress.length - 1);
    const dayXX = binarySearch(progress, price * 2, dayX , progress.length - 1);
    process.stdout.write(`${dayX} ${dayXX}`)
}

function binarySearch(arr, x, left, right, prev) {
    if (right <= left) {
        if (arr[left] >= x) {
            return left + 1;
        }
        if (prev > -1) {
            return prev + 1
        }

        return -1;
    }

    const mid = Math.floor((left + right) / 2);
    const midValue = arr[mid];

    if (midValue >= x) {
        return binarySearch(arr, x, left, mid, mid);
    } else {
        return binarySearch(arr, x,mid + 1, right, prev);
    }
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
