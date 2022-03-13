/*
№ 65071687

-- ПРИНЦИП РАБОТЫ --
- Номер корзины вычисляется методом деления.
- В качестве модуля взято наибольшее простое число (100003) с учетом условий задачи (Число хранимых в таблице ключей не превосходит 10^5)
- Коллизии разрешаются с помощью метода цепочек.

Если n - общее число запросов.
-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
O(n), т.к. все операции в среднем совершаются за константное время O(1+α), α - коэф. заполнения.

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
O(n)
Дополнительная память тратится на поддержание связных списков
* */

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
            const deletedNode = ref.deleteByKey(key);
            if (deletedNode) {
                const [k, v] = deletedNode.value;
                return v;
            }
            return "None";
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
    }

    push(x) {
        if (!this.head) {
            this.head = new Node(x);
            return this.head;
        }

        const newNode = new Node(x);
        this.head.prev = newNode;
        newNode.next = this.head
        this.head = newNode;

        return this.head;
    }

    getByKey(key) {
        let nextNode = this.head;
        while (nextNode) {
            const [k, v] = nextNode.value;
            if (key === k) {
                return nextNode;
            }

            nextNode = nextNode.next;
        }

        return null;
    }

    deleteByKey(key) {
        const nodeToDelete = this.getByKey(key);

        if (nodeToDelete) {
            const prev = nodeToDelete.prev;
            const next = nodeToDelete.next;
            if (!prev) {
                this.head = nodeToDelete.next;
                return nodeToDelete;
            }

            prev.next = next;

            if (next) {
                next.prev = prev;
            }

            return nodeToDelete;
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
