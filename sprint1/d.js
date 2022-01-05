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

function getWeatherRandomness(temperatures) {
    let i = 0;
    let result = 0;
    while (i <= temperatures.length - 1) {
        if ((temperatures[i - 1] === undefined|| temperatures[i] > temperatures[i - 1])) {
            if (temperatures[i + 1] === undefined || temperatures[i] > temperatures[i + 1]) {
                result++
            }
        }
        i++
    }

    return result;
}

function solve() {
    const n = readInt();
    const temperatures = readArray();
    process.stdout.write(`${getWeatherRandomness(temperatures)}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
