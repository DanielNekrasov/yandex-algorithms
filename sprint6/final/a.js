/**
 № 66730751
 -- ПРИНЦИП РАБОТЫ --
 Алгоритм построен на основе поиска минимального остовного дерева, алгоритм которого описан в теории.
 Только вместо выбора ребра с минимальным весом, берется ребро с максимальным весом.
 Рёбра, исходящие из уже собранного подмножества остова храним в куче с поддержанием максимума.

 Алгоритм примерно такой:
 – Добавляем любую вершину
 При добавлении вершины обновляется множество рассматриваемых ребер.
 Пока не добавлены все вершины и не рассмотрены все ребра:
    – Из множества рассматриваемых ребер извлекаем ребро с максимальным весом и добавляем в кучу
    - Добавляем следующую вершину, которая принадлежит выбранному ребру

 -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 Сложность с учетом применения списка смежности и поиском максимального ребра на куче – O(|E| * log|V|), где |E| - количество ребер, |V| - количество вершин.

 -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 Массив ребер: O(|E|)
 Список смежности: O(|V| + |E|)
 Куча: на хранение O(|E|) + O(log |E|) на поддержание стека вызовов при просеиваниях.
 Итого: O(|V| + |E|)
 */


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

class Heap {
    constructor(comparator) {
        this.heap = [];
        this.size = 0;
        this.comparator = comparator;
    }

    add(key) {
        const index = this.size + 1;
        this.heap[index] = key;
        this.size++;
        this.siftUp(index);
    }

    popMax() {
        const result = this.heap[1];
        this.heap[1] = this.heap[this.size];
        this.size--;

        this.siftDown(1)
        return result;
    }

    siftUp(idx) {
        if (idx === 1) {
            return idx;
        }
        const parentIndex = Math.floor(idx / 2);

        if (this.comparator(this.heap[idx], this.heap[parentIndex])) {
            [this.heap[idx], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[idx]];

            return this.siftUp(parentIndex);
        }

        return idx;
    }

    siftDown(idx) {
        const left = idx * 2;
        const right = idx * 2 + 1;
        let indexLargest;

        if (this.size < left) {
            return idx;
        }

        if (right <= this.size && this.comparator(this.heap[right], this.heap[left])) {
            indexLargest = right;
        } else {
            indexLargest = left;
        }

        if (this.comparator(this.heap[indexLargest], this.heap[idx])) {
            [this.heap[idx], this.heap[indexLargest]] = [this.heap[indexLargest], this.heap[idx]];

            return this.siftDown(indexLargest);
        }

        return idx;
    }
}

class Edge {
    constructor(start, end, weight) {
        this.start = start;
        this.end = end;
        this.weight = weight;
    }
}

class Graph {
    constructor(edges, nVertices) {
        this.vertices = Array.from({ length: nVertices }, (_, i) => i + 1);
        this.adjacency = this._buildAdjacency(edges, nVertices);
    }

    _buildAdjacency(edges, n) {
        let list = new Map(Array.from({ length: n }, (_, i) => [i + 1, new Set()]));

        edges.forEach((e) => {
            list.set(e.start, list.get(e.start).add(e));
            list.set(e.end, list.get(e.end).add(e));
        });

        return list;
    }

    findMaxSpanTree() {
        const added = new Set();
        const notAdded = new Set(this.vertices);
        const edges = new Heap((a, b) => a.weight > b.weight);
        let totalWeight = 0;

        const addVertex = (v) => {
            added.add(v);
            notAdded.delete(v);

            for (let e of this.adjacency.get(v)) {
                if (notAdded.has(e.start) || notAdded.has(e.end)) {
                    edges.add(e);
                }
            }
        }

        const [v] = this.vertices;
        addVertex(v);

        while (notAdded.size > 0 && edges.size > 0) {
            const e = edges.popMax();

            if (notAdded.has(e.end)) {
                totalWeight += e.weight;
                addVertex(e.end);
            }

            if (notAdded.has(e.start)) {
                totalWeight += e.weight;
                addVertex(e.start);
            }
        }

        if (notAdded.size > 0) {
            throw Error('Исходный граф – несвязный');
        }

        return totalWeight;
    }
}

function solve() {
    const [n, m] = readIntArray(2);
    let edges = new Array(m);

    // read Input
    for (let i = 0; i < m; i++) {
        const [from, to, weight] = readIntArray(3);
        edges[i] = new Edge(from, to, weight);
    }

    const graph = new Graph(edges, n);

    try {
        const sum = graph.findMaxSpanTree();
        process.stdout.write(`${sum}`);
    } catch (e) {
        process.stdout.write('Oops! I did it again');
    }
}

function readIntArray(limit) {
    var arr = _inputLines[_curLine].trim(" ").split(" ", limit).map(num => Number(num));
    _curLine++;
    return arr;
}
