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

function getNumberFromList(listNumber) {
    let result = 0;
    const lastIndex = listNumber.length - 1;
    for (let i = 0; i <= lastIndex; i++) {
        result = result + listNumber[i] * Math.pow(10 , (lastIndex - i));
    }
    return result;
}

function getListFromNumber(number) {
    let remain = number;
    let result = [];
    while (remain > 0) {
        const mod = remain % 10;
        remain = (remain - mod) / 10;
        result.unshift(mod)
    }
    return result;
}

function getSum(listNumber, number) {
    const firstNumber = getNumberFromList(listNumber);
    return getListFromNumber(firstNumber + number)
}

function solve() {
    const length = readInt();
    const listNumber = readArray()
    const number = readInt();

    process.stdout.write(`${getSum(listNumber, number).join(' ')}`);
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
