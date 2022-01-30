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
    const [n, k] = readArray();
    const houses = readArray();
    const result = amountOfHouse(k, houses);

    process.stdout.write(`${result}`)
}


function amountOfHouse(budget, houseArr) {
    let budgetLeft = budget;
    let counter = 0;
    const sortedHouses = houseArr.sort((a, b) => a - b);

    for (let house of sortedHouses) {
        if (budgetLeft >= house) {
            counter++;
            budgetLeft -= house;
        } else {
            break;
        }
    }

    return counter;
}


function readArray() {
    let arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}

