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
    const number = readInt();
    const arr = readArray();
    arr.sort((a, b) => {
       const var1 = Number(`${a}${b}`);
       const var2 = Number(`${b}${a}`);
       return var2 - var1
    });

    process.stdout.write(`${arr.join('')}`)
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

