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
    const a = readArray(n);
    const m = readInt();
    const b = readArray(m);

    const dp = Array.from(new Array(n + 1), () => new Array(m + 1));

    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= m; j++) {
            if (i === 0 || j === 0) {
                dp[i][j] = 0;
            } else {
                if (a[i - 1] === b[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
    }

    console.log(dp[n][m]);

    const aIndexes = [];
    const bIndexes = [];
    let i = n;
    let j = m;

    while (dp[i][j] !== 0) {
        if (a[i - 1] === b[j - 1]) {
            aIndexes.push(i);
            bIndexes.push(j);
            i--;
            j--;
        } else {
            if (dp[i][j] === dp[i - 1][j]) {
                i--;
            } else if (dp[i][j] === dp[i][j - 1]) {
                j--;
            }
        }
    }

    console.log(aIndexes.reverse().join(' '));
    console.log(bIndexes.reverse().join(' '));
}

function readArray(limit) {
    var arr = _inputLines[_curLine].trim(" ").split(" ", limit).map(num => Number(num));
    _curLine++;
    return arr;
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}
