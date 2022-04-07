/**
 № 66853555
 -- ПРИНЦИП РАБОТЫ И ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 Определение того является ли предоставленная карта оптимальной сводится к нахождению циклов в графе. (Жалко, что не сам придумал такую гениальную идею:)
 Действительно, так как из условия задачи все дороги направлены от меньшего номера к большему, если изменить направление одного из типов дорог на противоположное (в решении это B), то в случае нахождения цикла это будет говорить о том, что не выполняется условие оптимальности среди городов в цикле.
 Для поиска цикла используем обход в глубину. Если при обработке смежных вершин мы натыкаемся на уже посещенную вершину – это указывает на наличие цикла.
 Граф представляем спискам смежности.

 -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 Построение списка смежности: O(|V| ^ 2 / 2)
 Определение цвета вершины: O(1)
 Обход графа: O(|V| + |E|)

 Общая сложность: O(|V|^2 + |E|), так как граф полный -> O(E) = O(V^2). Итого: O(V^2)

 -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 Массив с типами дорог (road): O(|V|)
 Список цветов: O(|V|)
 Стек вершин: O(|V|)
 Список смежности: O(|V| + |E|)

 Общая сложность: O(|V| + |E|), так как граф полный, можно считать что O(E) = O(V^2). Итого: O(|V|^2)
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

function solve() {
    const n = readInt();
    const adjacencyList = buildAdjacencyList(n);
    process.stdout.write(`${Graph.hasCycles(adjacencyList) ? 'NO': 'YES'}`);
}

function buildAdjacencyList(n) {
    const adjacencyList = Array.from(new Array(n), () => []);

    for (let i = 0; i < n - 1; i++) {
        const road = readArray(n - i - 1);
        road.forEach((type, j) => {
            if (type === 'R') {
                adjacencyList[i].push(j + i + 1);
            }

            if (type === 'B') {
                adjacencyList[j + i + 1].push(i);
            }
        })
    }

    return adjacencyList;
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

const COLOR_WHITE = 'white';
const COLOR_GRAY = 'gray';
const COLOR_BLACK = 'black';

class Graph {
    static hasCycles(adjacency) {
        const color = Array.from(new Array(adjacency.length), () => COLOR_WHITE);

        for (let i = 0; i < adjacency.length; i++) {
            if (color[i] !== COLOR_WHITE) {
                continue;
            }

            const stack = new Stack();
            stack.push(i);

            while (stack.getSize() > 0) {
                const v = stack.pop();

                if (color[v] === COLOR_WHITE) {
                    color[v] = COLOR_GRAY;
                    stack.push(v)

                    for (let u of adjacency[v]) {
                        if (color[u] === COLOR_GRAY) {
                            return true;
                        }

                        if (color[u] === COLOR_WHITE) {
                            stack.push(u);
                        }
                    }
                } else if (color[v] === COLOR_GRAY) {
                    color[v] = COLOR_BLACK;
                }
            }
        }

        return false;
    }
}


function readArray(limit) {
    var arr = _inputLines[_curLine].trim(" ").split("", limit);
    _curLine++;
    return arr;
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}
