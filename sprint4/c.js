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
    const a = readInt();
    const m = readInt();
    const str = readString();
    const queriesNumber = readInt();
    const hashBuilder = createHashBuilder(str, a, m);

    for (let i = 0; i < queriesNumber; i++) {
        const [left, right] = readArray();
        console.log(hashBuilder.hashSubstr(left, right));
    }
}

function createHashBuilder(str, a, m) {
    const n = str.length;
    let p = [];
    let h = [0];

    p[1] = 0;
    p[2] = 1;

    for (let i = 3; i < n; i++) {
        p[i] = (p[i - 1] * a) % m
    }

    for (let i = 1; i <= n; i++) {
        h[i] = (h[i - 1] * a % m + str.charCodeAt(i - 1)) % m;
    }

    return {
        hashSubstr (left, right) {
            return h[right] - h[left] * p[right - left + 1];
        }
    }
}

function readString() {
    const n = _inputLines[_curLine];
    _curLine++;
    return n;
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
