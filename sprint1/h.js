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

function sumOfBinaries(firstNumber, secondNumber) {
    let firstDiv = `${firstNumber}`;
    let secondDiv = `${secondNumber}`;
    let memory = 0;
    let result = '';
    let step = 0;

    while (firstDiv || secondDiv) {
        const firstMod = firstDiv.slice(-1);
        const secondMod = secondDiv.slice(-1);
        const stepSum = (parseInt(firstMod, 10) || 0) + (parseInt(secondMod, 10) || 0) + memory;
        if (stepSum === 2) {
            memory = 1;
            result = `0${result}`
        } else if (stepSum === 3) {
            memory = 1
            result = `1${result}`
        } else {
            memory = 0
            result = `${stepSum}${result}`
        }

        firstDiv = firstDiv ? firstDiv.substring(0, firstDiv.length - 1) : '';
        secondDiv = secondDiv ? secondDiv.substring(0, secondDiv.length - 1): '';
        step++;
    }

    result = memory ? `${memory}${result}` : result || 0

    return result;
}

function solve() {
    const firstNumber = readLine();
    const secondNumber = readLine();
    process.stdout.write(`${sumOfBinaries(firstNumber, secondNumber)}`);
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

function readLine() {
    const line = _inputLines[_curLine];
    _curLine++;
    return line;
}
