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
    const arr = readArray();
    const result = calcGroups(arr);

    process.stdout.write(`${result}`)
}

function calcGroups(arr) {
    let count = 0;
    let maxInGroup = 0;
    let nextNumber = 0;

    for (let i = 0; i <= arr.length - 1; i++) {
        const current = arr[i];

        if (current > maxInGroup) {
            maxInGroup = current;
        }

        if (maxInGroup === i) {
            nextNumber = maxInGroup + 1
            count++
        }
    }

    return count;
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
