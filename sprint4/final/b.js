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

function callHashFunction(instance, command, ...args) {
    return instance[command](...args)
}

function solve() {
    let result = [];
    const commandsCount = readInt()
    const hash = new Hash();

    for (let i = 0; i <= commandsCount - 1; i++) {
        const [fn, ...args] = readCommand();

        const fnResult = callHashFunction(hash, fn, ...args);
        if (fnResult !== undefined) {
            result.push(fnResult);
        }
    }

    process.stdout.write(result.join('\n'));
}

class Hash {
    constructor() {
        this.capacity = 100003;
        this.items = [];
    }

    _hash(k) {
        return k;
    }

    _bucket(key) {
        return this._hash(key) % this.capacity;
    }

    put(key, value) {
        let ref = this.items[this._bucket(key)];
        if (!ref) {
            ref = new LinkedList();
            ref.push([key, value]);
            this.items[this._bucket(key)] = ref;
            return;
        }
        const node = ref.getByKey(key);
        if (!node) {
            ref.push([key, value]);
            return;
        }
        node.value = [key, value];
    }

    get(key) {
        const ref = this.items[this._bucket(key)];
        if (ref) {
            const node = ref.getByKey(key);
            if (node) {
                const [k, v] = node.value;
                return v;
            }
            return "None";
        }
        return 'None';
    }

    delete(key) {
        const ref = this.items[this._bucket(key)];
        if (ref) {
            return ref.deleteByKey(key) || "None";
        }

        return "None";
    }
}

class Node {
    constructor(value = null, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class LinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.size = 0
    }

    push(x) {
        const newTail = new Node(x);
        if (this.size === 0) {
            this.head = newTail;
        }

        if (this.tail) {
            newTail.prev = this.tail;
            this.tail.next = newTail
        }

        this.tail = newTail;
        this.size++;
    }

    getByKey(key) {
        let nextNode = this.head;
        let i = this.size
        while (i) {
            const [k, v] = nextNode.value;
            if (key === k) {
                return nextNode;
            }

            nextNode = nextNode.next;
            i = i - 1;
        }

        return null;
    }

    deleteByKey(key) {
        const nodeToDelete = this.getByKey(key);

        if (nodeToDelete) {
            if (this.size === 1) {
                this.head = null;
                this.tail = null;
            }

            const prev = nodeToDelete.prev;
            const next = nodeToDelete.next;
            if (prev) {
                prev.next = next;
            }
            if (next) {
                next.prev = prev;
            }

            const [k, v] = nodeToDelete.value;
            this.size--;
            return v;
        }

        return null;
    }
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readCommand() {
    let [command, ...arg] = _inputLines[_curLine].trim(" ").split(" ");

    _curLine++;
    return [command, ...arg.map(Number)];
}
