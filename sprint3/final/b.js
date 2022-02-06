/*
ID 64741616
- ПРИНЦИП РАБОТЫ --
По идее принцип работы описан в задаче:)
Добавил вторым аргументом функцию comparator. Которая сравнивает два элемента массива.
Добавил класс Participant для удобства сравнения.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Худший случай. Сложность достигнет O(n^2). Такое возможно при несбалансированном разбиении массива. Если в качестве опорного выбран наибольший или наименьший на обрабатываемом отрезке.
Тогда потребуется n - 1 операций разделения.

O(n*log n) в среднем. Когда глубина рекурсии равно O(log n) и на каждом уровне выполняется не более O(n) операций.

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Алгоритм требует O(1) дополнительной памяти, но расходует память на совершение рекурсивных вызовов: O(n) в худшем случае и O(log n) – в среднем.
Общая пространственная сложность таким образом зависит от глубины рекурсии, от O(log n) до O(n).

*/

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
    let participants = []
    const num = readInt();

    for (let i = 0; i <= num - 1; i++) {
        participants.push(readArray());
    }

    quicksort(participants, participantComparator);

    for (let i = 0; i <= num - 1; i++) {
        process.stdout.write(`${participants[i].login}`)
        process.stdout.write(`\n`)
    }
}

class Participant {
    constructor(login, points, penalty) {
        this.login = login;
        this.points = points;
        this.penalty = penalty;
    }
}

function participantComparator(a, b) {
    if (a.points === b.points) {
        if (a.penalty === b.penalty) {
            return a.login < b.login
        }
        return a.penalty < b.penalty;
    }
    return a.points > b.points
}

function partition(arr, comparator, left, right) {
    const pivot = arr[Math.floor((left + right) / 2)]
    let l = left;
    let r = right;

    while (true) {
        while (comparator(arr[l], pivot)) {
            l++
        }
        while (comparator(pivot, arr[r])) {
            r--
        }
        if (l >= r) {
            return r;
        }
        [arr[l], arr[r]] = [arr[r], arr[l]]
        l++;
        r--
    }
}

function quicksort(arr, comparator, left = 0, right = arr.length - 1) {
    if (left < right) {
        const p = partition(arr, comparator, left, right)
        quicksort(arr, comparator, left, p);
        quicksort(arr, comparator, p + 1, right)
    }
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
