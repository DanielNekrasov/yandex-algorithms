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
    const commandsCount = readInt()
    const maxSize = readInt()

    const stack = new MyQueueSized(maxSize);

    for (let i = 0; i <= commandsCount - 1; i++) {
        const [fn, arg] = readCommand();

        if (typeof stack[fn] === "function") {
            try {
                const result = stack[fn](arg);
                if (result !== undefined) {
                    process.stdout.write(`${result}`)
                    process.stdout.write("\n");
                }
            } catch (e) {
                process.stdout.write(`${e.message}`)
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


class MyQueueSized {
    constructor(maxSize) {
        this.maxSize = maxSize
        this.queue = new Array(maxSize);
        this.head = 0
        this.tail = 0
        this.qSize = 0
    }

    push(value) {
        if (this.qSize === this.maxSize) {
            throw new Error('error');
        }

        this.queue[this.tail] = value
        this.tail = (this.tail + 1) % this.maxSize
        this.qSize++;
    }

    pop() {
        if (this.qSize === 0) {
            throw new Error('None');
        }

        const value = this.queue[this.head];

        this.queue[this.head] = undefined;
        this.head = (this.head + 1) % this.maxSize
        this.qSize--;

        return value;
    }

    peek() {
        if (this.qSize === 0) {
            throw new Error('None');
        }

        return this.queue[this.head];
    }

    size() {
        return this.qSize;
    }
}
