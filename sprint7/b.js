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
    let rasp = [];
    for (let i = 0; i < n; i++) {
        rasp.push(readArray(2));
    }

    const sorted = rasp.sort((a, b) => {
        const [aStart, aEnd] = a;
        const [bStart, bEnd] = b;

        if (aEnd === bEnd) {
            if (aStart === bStart) {
                return 0;
            }

            if (aStart > bStart) {
                return 1;
            }

            return -1;
        }

        if (aEnd > bEnd) {
            return 1;
        }

        return -1;
    })

    let counter = 0;

    let [time,] = sorted[0]
    let intervals = [];

    for (let i = 0; i < n; i++) {
        const [start, end] = sorted[i];
        if (time <= start) {
            intervals.push(sorted[i]);
            counter++;
            time = end;
        }
    }
    console.log(counter);

    intervals.forEach(i => {
        console.log(i.join(' '));
    })

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
