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
    const m = readInt();
    const southData = readArray();
    const northData = readArray();

    const merged = merge(southData, northData)
    let median;
    if (merged.length % 2 === 0) {
        median = (merged[merged.length / 2 - 1] + merged[(merged.length / 2)]) / 2
    } else {
        median = merged[Math.floor(merged.length / 2)]
    }

    process.stdout.write(`${median}`)
}

function merge(arr1, arr2) {
    let result = new Array(arr1.length + arr2.length);
    let l = 0;
    let r = 0;
    let k = 0;

    while (l < arr1.length && r < arr2.length) {
        if (arr1[l] <= arr2[r]) {
            result[k] = arr1[l]
            l += 1
        } else {
            result[k] = arr2[r]
            r += 1
        }
        k += 1
    }

    while (l < arr1.length) {
        result[k] = arr1[l];
        l += 1
        k += 1
    }

    while (r < arr2.length) {
        result[k] = arr2[r];
        r += 1
        k += 1
    }

    return result;
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
