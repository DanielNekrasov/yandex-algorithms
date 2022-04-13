const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin
})

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    _inputLines.push(line);
})

process.stdin.on('end', solve);

function solve() {
    const n = readInt();
    const prices = readArray(n);

    const result = maxProfit(prices)
    console.log(result);
}

function maxProfit(prices) {

    const list = Array.from(new Array(prices.length), () => []);
    for (let i = 0; i < prices.length; i++) {
        for (let j = i + 1; j < prices.length; j++) {
           const diff = prices[j] - prices[i];
           if (diff > 0) {
               list[i].push([j, diff]);
           }
        }
    }


    return list;
}


function readArray(limit) {
    var arr = _inputLines[_curLine].trim(" ").split(" ", limit).map(i => Number(i));
    _curLine++;
    return arr;
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}
