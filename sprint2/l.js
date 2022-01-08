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

function commitsOfUser(n, k) {
    if (n === 0 || n === 1) {
        return 1;
    }

    const mod = BigInt(10 ** k)

    let acc = new Array(2);
    acc[0] = BigInt(1);
    acc[1] = BigInt(1);
    let i = 2;
    let index = 0;

    while (i <= n) {
        index = i % 2;
        acc[index] = BigInt(acc[0] + acc[1]) % mod;
        i++;
    }

    return acc[index];
}

function solve() {
    const [n, k] = readInput();
    const commitsCount = commitsOfUser(n, k);
    process.stdout.write(`${commitsCount}`)
}

function readInput() {
    const [n, k] = _inputLines[_curLine].trim(" ").split(" ").map(i => Number(i));
    _curLine++;
    return [n, k];
}
