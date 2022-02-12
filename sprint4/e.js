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
    const str = readString();
    let i = 0;
    let max = 0;

    let substrMap = new Map();

    while (i < str.length) {
        const letter = str[i];
        if (!substrMap.has(letter)) {
            substrMap.set(letter, i);
            i++;
            continue;
        }

        i = substrMap.get(letter) + 1;
        max = substrMap.size > max ? substrMap.size: max;
        substrMap.clear();
    }
    max = substrMap.size > max ? substrMap.size: max;

    console.log(max);
}

function readString() {
    const n = _inputLines[_curLine];
    _curLine++;
    return n;
}
