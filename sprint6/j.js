const _readline = require('readline');

const _reader = _readline.createInterface({
    input: process.stdin
})

const _inputLines = [];
let _curLine = 0;

_reader.on('line', line => {
    _inputLines.push(line);
})

process.stdin.on('end', solve);

class Node {
    constructor(value = null, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class Stack {
    constructor() {
        this.tail = null
        this.size = 0;
    }

    push(x) {
        const newTail = new Node(x);
        if (!this.tail) {
            this.tail = newTail;
        } else {
            newTail.prev = this.tail;
            this.tail = newTail;
        }

        this.size++;
    }

    pop() {
        if (this.size === 0) {
            throw new Error('error');
        }

        const x = this.tail.value
        this.tail = this.tail.prev;

        this.size--;
        return x;
    }

    getSize() {
        return this.size;
    }

    print() {
        let next = this.tail;
        const result = [];

        while (next) {
            result.push(next.value);
            next = next.prev;
        }

        return result;
    }
}

function readArray() {
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}

function readInt() {
    const value = Number(_inputLines[_curLine]);
    _curLine++;
    return value;
}

const COLOR_WHITE = 'white';
const COLOR_GRAY = 'gray';
const COLOR_BLACK = 'black';

function solve() {
    const [n, m] = readArray();
    let edges = [];
    for (let i = 0; i < m; i++) {
        edges.push(readArray());
    }

    const list = buildList(n, edges);
    const order = new Stack();
    const color = Array.from(new Array(n), () => COLOR_WHITE);

    function mainTopSort() {
        for (let i = 0; i <= n - 1; i++) {
            if (color[i] === COLOR_WHITE) {
                topSort(i);
            }
        }
    }

    function topSort(v) {
        color[v] = COLOR_GRAY;

        for (let w of list[v]) {
            if (color[w] === COLOR_WHITE) {
                topSort(w);
            }
        }

        color[v] = COLOR_BLACK;

        order.push(v);
    }

    mainTopSort();
    console.log(order.print().map(i => i + 1).join(' '));
}

function buildList(n, edges) {
    let list = Array.from(new Array(n), () => []);

    edges.forEach(([u, v]) => {
        list[u - 1].push(v - 1);
    });

    list = list.map(i => i.sort((a, b) => b - a))

    return list;
}
