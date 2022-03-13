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
    const s1 = readString();
    const s2 = readString();

    process.stdout.write(`${areEquals(s1, s2) ? "YES": "NO"}`)
}


function areEquals(s1, s2) {
    if (s1.length !== s2.length) {
        return false;
    }

    const map1 = new Map();
    const map2 = new Map();

    for (let i = 0; i < s1.length; i++) {
        if (map1.has(s1[i])) {
            if(map1.get(s1[i]) !== s2[i]) {
                return false;
            }
        } else {
            if (map2.has(s2[i])) {
                return false;
            }
            map1.set(s1[i], s2[i]);
            map2.set(s2[i], s1[i]);
        }
    }

    return true;
}

function readString() {
    const n = _inputLines[_curLine];
    _curLine++;
    return n;
}
