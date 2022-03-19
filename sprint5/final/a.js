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

class Participant {
    constructor(login, points, penalty) {
        this.login = login;
        this.points = points;
        this.penalty = penalty;
    }

    static comparator(a, b) {
        if (a.points === b.points) {
            if (a.penalty === b.penalty) {
                return a.login < b.login
            }
            return a.penalty < b.penalty;
        }
        return a.points > b.points
    }
}

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

function solve() {
    let participants = []
    const num = readInt();

    for (let i = 0; i <= num - 1; i++) {
        participants.push(readArray());
    }

    const sorted = heapSort(participants, Participant.comparator);

    for (let i = 0; i <= num - 1; i++) {
        process.stdout.write(`${sorted[i].login}`)
        process.stdout.write(`\n`)
    }
}

function heapSort(arr, comparator) {
    const heap = new Heap(comparator);

    arr.forEach(i => {
        heap.add(i);
    })

    let sortedArray = []

    while (heap.size > 0) {
        sortedArray.push(heap.popMax());
    }

    return sortedArray;
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    let [login, points, penalty] = _inputLines[_curLine].trim(" ").split(" ");

    _curLine++;
    return new Participant(login, Number(points), Number(penalty));
}
