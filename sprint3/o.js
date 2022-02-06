// const _readline = require('readline');
//
// const _reader = _readline.createInterface({
//     input: process.stdin
// });
//
// const _inputLines = [];
// let _curLine = 0;
//
// _reader.on('line', line => {
//     _inputLines.push(line);
// });
//
// process.stdin.on('end', solve);
//
// function solve() {
//     const n = readInt();
//     const squares = readArray();
//     const k = readInt();
//     const result = findMinDiff(squares, k)
//
//     process.stdout.write(`${result}`)
// }

function findMinDiff(squares, k) {
    const sorted = squares.sort((a, b) => a - b)

    return getMinDiff(sorted, k);
}

function getMinDiff(numbers, k) {
    const n = numbers.length;
    let numberOfPairs = 0;
    let step = 1;

    while (step < n) {
        numberOfPairs = numberOfPairs + (n - step)
        if (numberOfPairs >= k) {
            break;
        }
        step++
    }

    const diffs = [];
    for (let i = 0; i <= n - step - 1; i++) {
        diffs.push(numbers[i + step] - numbers[i])
    }

    const sorted = diffs.sort((a, b) => a - b)

    return sorted[k - (numberOfPairs - sorted.length + 1)];
}

findMinDiff([27,67,3,4,17,98], 7)

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
