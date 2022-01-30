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
    const childrenCount = readInt();
    const greedArr = readArray();
    const cookiesCount = readInt();
    const cookiesArr = readArray();

    const result = countHappy(greedArr, cookiesArr);


    process.stdout.write(`${result}`)
}

function countHappy(children, cookies) {
    let happy = [];
    let cookieIndex = 0;
    const childrenSorted = children.sort((a, b) => a - b);
    const cookiesSorted = cookies.sort((a, b) => a - b);

    for (let childGreed of childrenSorted) {
        while (cookieIndex <= cookiesSorted.length - 1) {
            if (childGreed <= cookiesSorted[cookieIndex]) {
                happy.push(childGreed);
                cookieIndex++;
                break;
            }
            cookieIndex++;
        }
        if (cookieIndex === cookiesSorted.length) {
            break;
        }
    }

    return happy.length;
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

