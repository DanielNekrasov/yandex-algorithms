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
    const _number = readInt();
    const list = readArray();
    const k = readInt();
    process.stdout.write(`${rateUniversities(list, k).join(' ')}`);
}

function rateUniversities(list, k) {
    let ids = {};
    for (let id of list) {
        if(ids[id] !== undefined) {
            ids[id] = [ids[id][0] + 1, id]
        } else {
            ids[id] = [1, id];
        }}

    return Object.values(ids).sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        return b[0] - a[0];
    }).slice(0, k).map(i => i[1])
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
