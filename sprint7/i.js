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
    const [n, m] = readArray();
    let field = [];
    for (let i = 0; i < n; i++) {
        field.unshift(readLine(m));
    }

    const dp = Array.from(Array(n + 1), () => {
        return Array.from(Array(m + 1), () => 0)
    });

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]) + field[i - 1][j - 1];
        }
    }

    console.log(dp[n][m]);
    // reverse path
    let path = [];

    let i = n;
    let j = m;
    while (i > 1 || j > 1) {
        if (dp[i - 1][j] > dp[i][j - 1] || j === 1) {
            path.push('U')
            i--;
        } else {
            path.push('R')
            j--;
        }
    }

    console.log(path.reverse().join(''));
}

function readArray() {
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}

function readLine(limit) {
    var arr = _inputLines[_curLine].trim(" ").split("", limit).map(num => Number(num));
    _curLine++;
    return arr;
}
