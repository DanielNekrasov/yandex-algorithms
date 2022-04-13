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
    const [n, M] = readArray();
    const goldWeights = readArray(n);
    let dpPrev = Array.from(new Array(M + 1));
    let dp = Array.from(new Array(M + 1));

    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= M; j++) {
            if (i === 0 || j === 0) {
                dp[j] = 0;
            } else {
                if (goldWeights[i - 1] > j) {
                    dp[j] = dpPrev[j];
                } else {
                    const prev = dpPrev[j];
                    const byFormula = goldWeights[i - 1] + dpPrev[j - goldWeights[i - 1]];

                    dp[j] = Math.max(prev, byFormula);
                }
            }
        }

        dpPrev = [...dp];
    }

    console.log(dp[M]);
}

function readArray(limit) {
    var arr = _inputLines[_curLine].trim(" ").split(" ", limit).map(num => Number(num));
    _curLine++;
    return arr;
}
