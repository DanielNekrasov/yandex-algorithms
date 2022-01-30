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
    const number = readInt();
    const arr = readArray();
    bubble(arr);
}

function bubble(list) {
    let hasSwapped = false;
    for (let j = 1; j < list.length; j++ ) {
        let f = 0;
        for (let i = 0; i < list.length - j; i++) {
            if(list[i] > list[i + 1]) {
                const temp = list[i];
                list[i] = list[i + 1];
                list[i + 1] = temp
                f = 1;
                hasSwapped = true;
            }
        }

        if (f === 0) {
            break;
        }

        writeList(list);
    }

    if (!hasSwapped) {
        writeList(list);
    }
}

function writeList(list) {
    process.stdout.write(`${list.join(' ')}`)
    process.stdout.write("\n");
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
