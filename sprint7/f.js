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
    const [n, k] = readArray();
    const dp = Array.from(new Array(n + 1), () => 0);
    dp[2] = 1;
    dp[3] = 2;

    for (let i = 4; i <= n; i++) {
        for (let j = 1; j <= k; j++) {
            if (dp[i - j] === undefined) {
                continue;
            }
            dp[i] += dp[i - j];
        }
    }

    console.log(dp);
}


function readArray(limit) {
    var arr = _inputLines[_curLine].trim(" ").split(" ", limit).map(i => Number(i));
    _curLine++;
    return arr;
}