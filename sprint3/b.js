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
    const numbers = readArray();
    const result = [];
    combination(numbers, result);

    process.stdout.write(`${result.join(' ')}`)
}


function combination(keys,  acc = [], phrase = "",) {
    if (keys.length === 0) {
        acc.push(phrase);
    } else {
        const [key, ...rest] = keys;
        for (let i = 0; i <= keyboard[key].length - 1; i++) {
            combination(rest, acc, `${phrase}${keyboard[key][i]}`)
        }
    }
}

const keyboard = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz'
}

function readArray() {
    let arr = _inputLines[_curLine].trim(" ").split("").map(num => Number(num));
    _curLine++;
    return arr;
}


