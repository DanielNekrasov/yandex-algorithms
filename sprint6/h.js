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
        if (this.size === 0) {
            this.tail = newTail;
        }

        if (this.tail) {
            newTail.prev = this.tail;
            this.tail.next = newTail
        }
        this.tail = newTail;

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
}

function buildList(n, edges) {
    let list = Array.from(new Array(n + 1), () => []);

    edges.forEach(([u, v]) => {
        list[u].push(v);
    });

    list = list.map(i => i.sort((a,b) => b - a))

    return list;
}

function solve() {
    const [n, m] = readArray();
    let edges = [];
    for (let i = 0; i < m; i++) {
        edges.push(readArray());
    }

    const list = buildList(n, edges);

    const COLOR_WHITE = 'white';
    const COLOR_GRAY = 'gray';
    const COLOR_BLACK = 'black';

    let time = 0
    const color = Array.from(new Array(n + 1), () => COLOR_WHITE);
    const entry = Array.from(new Array(n + 1), () => null);
    const leave = Array.from(new Array(n + 1), () => null);

    function dfs(list, startVertex) {
        const stack = new Stack();
        stack.push(startVertex);

        while (stack.getSize() > 0) {
            const v = stack.pop();
            if (color[v] === COLOR_WHITE) {
                color[v] = COLOR_GRAY;
                stack.push(v);
                entry[v] = time;
                time++;

                for (let u of list[v]) {
                    if (color[u] === COLOR_WHITE) {
                        stack.push(u);
                        entry[u] = time;
                    }
                }
            } else if (color[v] === COLOR_GRAY) {
                color[v] = COLOR_BLACK;
                leave[v] = time;
                time++;
            }
        }

    }

    dfs(list, 1);

    for (let i = 1; i < entry.length; i++) {
        console.log(`${entry[i]} ${leave[i]}`)
    }
}


