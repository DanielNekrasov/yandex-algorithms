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

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function solve() {
    const n = readInt();
    process.stdout.write(`${calcBinTrees(n)}`);
}

function calcBinTrees(n) {
    const t = [1, 1];
    let i = 2;
    while (i <= n) {
        let j = i - 1;
        let tCur = 0;
        while (j >= 0) {
            tCur += t[t.length - j - 1] * t[j];
            j--;
        }
        t[i] = tCur;
        i++;
    }
    return t[t.length - 1];
}
