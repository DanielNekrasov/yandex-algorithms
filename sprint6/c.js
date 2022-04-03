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

function solve() {
    const [n, m] = readArray();
    let edges = [];
    for (let i = 0; i < m; i++) {
        edges.push(readArray());
    }

    const list = buildList(n, edges);
    const startVertex = readInt();
    dfs(list, startVertex);
}

function buildList(n, edges) {
    let list = Array.from(new Array(n + 1), () => []);

    edges.forEach(([u, v]) => {
        list[u].push(v);
        list[v].push(u);
    });

    list = list.map(i => i.sort((a,b) => b - a))

    return list;
}

function dfs(list, startVertex) {
    const stack = new Stack();
    const visited = Array.from(new Array(list.length), () => false);
    stack.push(startVertex);

    while (stack.getSize() > 0) {
        const v = stack.pop();
        if (!visited[v]) {
            process.stdout.write(`${v} `);
            visited[v] = true;

            for (let u of list[v]) {
                if (!visited[u]) {
                    stack.push(u);
                }
            }
        }
    }
}
