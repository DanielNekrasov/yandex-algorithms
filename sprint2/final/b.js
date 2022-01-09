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
    const arr = readArray();
    const polishNotationCalc = new PolishNotationCalc();

    for (let i = 0; i <= arr.length - 1; i++) {
        const item = arr[i];
        if (typeof item === 'number') {
            polishNotationCalc.push(item);
            continue;
        }
        polishNotationCalc.calc(item);
    }

    process.stdout.write(`${polishNotationCalc.result()}`)
}

function readArray() {
    let arr = _inputLines[_curLine].trim(" ").split(" ").map(symbol => {
        const parsed = Number(symbol);
        return Number.isInteger(parsed) ? parsed : symbol;
    });
    _curLine++;
    return arr;
}

class PolishNotationCalc {
    constructor() {
        this.stack = []
    }

    operators = {
        '-': function (a, b) {
            return a - b;
        },
        '+': function (a, b) {
            return a + b;
        },
        '*': function (a, b) {
            return a * b;
        },
        '/': function (a, b) {
            return Math.floor(a / b);
        }
    }

    push(value) {
        this.stack.push(value);
    }

    calc(operator) {
        const operand2 = this._pop();
        const operand1 = this._pop();

        const fn = this.operators[operator];
        if (!fn || typeof fn !== 'function') {
            throw new Error('operation is not supported');
        }

        const result = this.operators[operator].call(this, operand1, operand2);
        this.stack.push(result);

        return result;
    }

    result() {
        return this.stack[this.stack.length - 1];
    }

    _pop() {
        if (!this.stack.length) {
            return 'error';
        }

        return this.stack.pop();
    }
}
