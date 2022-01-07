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
    let arr = readArray();
    const bracketsList = arr.map(i => BracketFactory.create(i))
    process.stdout.write(`${isCorrectBracketSeq(bracketsList) ? 'True': 'False'}`)
}

function isCorrectBracketSeq(bracketsList) {
    let bracketStack = [];

    for (let i = 0; i <= bracketsList.length - 1; i++) {
        const bracket = bracketsList[i];

        if (bracket.opening) {
            bracketStack.push(bracket);
        } else {
            const lastInStack = bracketStack[bracketStack.length - 1];
            if (!lastInStack || lastInStack.type !== bracket.type) {
                return false;
            }
            bracketStack.pop();
        }
    }

    return bracketStack.length === 0
}

function readArray() {
    let arr = _inputLines[_curLine].trim(" ").split("");
    _curLine++;
    return arr;
}

class Bracket {
    constructor(type, opening) {
        this.type = type;
        this.opening = Boolean(opening)
    }
}

class BracketFactory {
    static create(char) {
        switch (char) {
            case "(":
                return new Bracket('round', true)
            case ")":
                return new Bracket('round', false)
            case "[":
                return new Bracket('square', true)
            case "]":
                return new Bracket('square', false)
            case "{":
                return new Bracket('curl', true)
            case "}":
                return new Bracket('curl', false)
        }
    }
}
