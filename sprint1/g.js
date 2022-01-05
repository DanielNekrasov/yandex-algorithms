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

function getBinaryNumber(number) {
    let result = '';
    let div = number;
    while (div > 1) {
        const mod = div % 2;
        div = Math.floor(div / 2);
        result = `${mod}${result}`
    }

    if (number > 0) {
        result = `1${result}`
    }

    return result;
}

function solve() {
    const n = readInt();
    process.stdout.write(`${getBinaryNumber(n)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readLine() {
    const line = _inputLines[_curLine];
    _curLine++;
    return line;
}


function readArray() {
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
