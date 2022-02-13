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
    const list = readArray();
    const grouped = groupAnagrams(list);

    Object.values(grouped).forEach(g => {
        console.log(g.join(' '));
    })
}

function groupAnagrams(arr) {
    return arr.reduce((acc, str, index) => {
        const key = str.split('').sort().join('');
        if (acc[key]) {
            acc[key].push(index);
        } else {
            acc[key] = [index];
        }
        return acc;
    }, {});
}


function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    let arr = _inputLines[_curLine].trim(" ").split(" ");
    _curLine++;
    return arr;
}


