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
    const stack = new QueueList();

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


class Node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

class QueueList {
    constructor() {
        this.head = null
        this.tail = null
        this.qSize = 0
    }

    put(x) {
        const newTail = new Node(x);
        if (this.qSize === 0) {
            this.head = newTail;
        }

        if (this.tail) {
            this.tail.next = newTail
        }
        this.tail = newTail;

        this.qSize++;
    }

    get() {
        if (this.qSize === 0) {
            throw new Error('error');
        }

        const x = this.head.value
        this.head = this.head.next;

        this.qSize--;
        return x;
    }

    size() {
        return this.qSize;
    }
}
