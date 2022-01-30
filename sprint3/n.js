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
    let sections = [];
    const number = readInt();
    for (let i = 0; i <= number - 1; i++) {
        sections.push(readArray())
    }

    const groups = getGroups(sections);

    groups.forEach(group => {
        process.stdout.write(`${group.join(' ')}`)
        process.stdout.write(`\n`)
    })
}

function getGroups(sections) {
    sections.sort((a, b) => {
        return a[0] - b[0];
    })

    const groups = [sections[0]];
    let k = 0;

    for (let i = 1; i <= sections.length - 1; i++) {
        if (groups[k][1] >= sections[i][0]) {
            groups[k] = [groups[k][0], groups[k][1] > sections[i][1] ? groups[k][1]: sections[i][1]]
        } else {
            groups.push(sections[i])
            k++;
        }
    }

    return groups;
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

