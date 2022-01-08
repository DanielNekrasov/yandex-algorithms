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

    const dec = new Dec(maxSize);

    for (let i = 0; i <= commandsCount - 1; i++) {
        const [fn, arg] = readCommand();

        if (typeof dec[fn] === "function") {
            try {
                const result = dec[fn](arg);
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

class Dec {
    constructor(capacity) {
        this.capacity = capacity
        this.items = new Array(capacity);
        this.head = 0
        this.tail = 0
        this.size = 0
    }

    is_empty() {
        return this.size === 0;
    }

    is_full() {
        return this.size === this.capacity;
    }

    push_back(x) {
        if (this.is_full()) {
            throw new Error('error');
        }

        this.items[this.tail] = x
        this.tail = (this.tail + 1) % this.capacity

        this.size++;
    }

    push_front(x) {
        if (this.is_full()) {
            throw new Error('error');
        }

        this.head = (this.head === 0 ? this.capacity : 0) + this.head - 1;
        this.items[this.head] = x;
        this.size++
    }

    pop_back() {
        if (this.is_empty()) {
            throw new Error('error');
        }

        this.tail = this.tail - 1 + (this.tail === 0 ? this.capacity : 0);
        const x = this.items[this.tail];
        this.items[this.tail] = undefined;
        this.size--

        return x;
    }

    pop_front() {
        if (this.is_empty()) {
            throw new Error('error');
        }

        const x = this.items[this.head];
        this.items[this.head] = undefined;
        this.head = (this.head + 1) % this.capacity
        this.size--;

        return x;
    }
}
