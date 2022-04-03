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
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

class Queue {
    constructor() {
        this.head = null
        this.tail = null
        this.qSize = 0
    }

    push(x) {
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

    pop() {
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
    bfs(list, startVertex);
}

function buildList(n, edges) {
    let list = Array.from(new Array(n + 1), () => []);

    edges.forEach(([u, v]) => {
        list[u].push(v);
        list[v].push(u);
    });

    list = list.map(i => i.sort((a,b) => a - b))

    return list;
}

function bfs(list, startVertex) {
    const queue = new Queue();
    const visited = Array.from(new Array(list.length), () => false);

    queue.push(startVertex);
    visited[startVertex] = true;

    while (queue.size() > 0) {
        const v = queue.pop();
        process.stdout.write(`${v} `);

        for (let u of list[v]) {
            if (!visited[u]) {
                queue.push(u);
                visited[u] = true;
            }
        }
    }
}
