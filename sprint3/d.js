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
//     const childrenCount = readInt();
//     const greedArr = readArray();
//     const cookiesCount = readInt();
//     const cookiesArr = readArray();
//
//     process.stdout.write(`${arr.join('')}`)
// }

function countHappy(children, cookies) {
    const happy = [];
    let cookieIndex = 0;
    const childrenSorted = children.sort((a, b) => a - b);
    const cookiesSorted = cookies.sort((a, b) => a - b);

    for (let childGreed of childrenSorted) {
        for (let cIndex in cookiesSorted) {
            if (childGreed <= cookiesSorted[cIndex]) {
                break
            }
        }
    }
}

countHappy([1, 2], [2, 1, 3]);

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

