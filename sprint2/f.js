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
    const stack = new StackMax();

    const commandsCount = readInt()

    for (let i = 0; i <= commandsCount - 1; i++) {
        const [fn, arg] = readCommand();

        if (typeof stack[fn] === "function") {
            const result = stack[fn](arg);

            if (result && typeof result === 'string' || typeof result === 'number') {
                process.stdout.write(`${result}`)
                process.stdout.write("\n");
            }
        }
    }
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readCommand() {
    let [command, arg] = _inputLines[_curLine].trim(" ").split(" ");

    _curLine++;
    return [command, Number(arg)];
}

class StackMax {
    constructor() {
        this.items = []
    }

    get_max() {
        if (!this.items.length) {
            return 'None';
        }

        const items = [...this.items];
        items.sort((a, b) => b - a)
        return items[0];
    }

    push(value) {
        this.items.push(value);
    }

    pop() {
        if (!this.items.length) {
            return 'error';
        }

        this.items.pop();
    }
}
