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
    psp(number)
}

function psp(n, stack = "", left = 0, right = 0) {
    if(left === n && right === n) {
        console.log(stack);
    } else {
        if (left < n) {
            psp(n, stack + '(', left + 1, right)
        }
        if (right < left) {
            psp(n, stack + ')', left, right + 1)
        }
    }
}


function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}
