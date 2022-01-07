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
    const stack = new StackMaxEffective();

    const commandsCount = readInt()

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
    constructor(value = null, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class StackMaxEffective {
    constructor() {
        this.lastItem = null
        this.lastMaxItem = null
    }

    get_max() {
        if (this.lastMaxItem === null) {
            throw new Error('None');
        }

        return this.lastMaxItem.value
    }

    push(value) {
        this.lastItem = this._push(this.lastItem, value);

        if (this.lastMaxItem === null || value >= this.lastMaxItem.value) {
            this.lastMaxItem = this._push(this.lastMaxItem, value)
        }
    }

    pop() {
        if (!this.lastItem) {
            throw new Error('error');
        }

        if (this.lastItem.value === this.lastMaxItem.value) {
            this.lastMaxItem = this._pop(this.lastMaxItem)
        }
        this.lastItem = this._pop(this.lastItem)
    }

    _push(tail, value) {
        const newTail = new Node(value);

        if (!tail) {
            return newTail;
        }

        const prevLastItem = tail;
        prevLastItem.next = newTail;
        newTail.prev = prevLastItem;
        return newTail
    }

    _pop(tail) {
        const prevTail = tail.prev;
        if (prevTail) {
            prevTail.next = null;
        }

        return prevTail;
    }
}
