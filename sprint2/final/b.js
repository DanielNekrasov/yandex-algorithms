/*
№ 63487455

-- ПРИНЦИП РАБОТЫ --
Стек PolishNotationCalc создан на основе массива. Вместимости массива достаточно при текущих входных ограничениях.

При чтении данных из входного потока создается массив, содержащий спарсенные числа и операторы.
Дальше полностью считываем массив слева направо пока.
При нахождении операнда – помещаем его на вершину стека. (метод push(x))
При нахождении оператора – производим операцию с ним над двумя последними числами из стека. (метод calc(operator))
Результат операции помещаем на вершину стека.
Класс содержит свойство operators – объект, где ключи это строка с операцией, а значение – ее функция.
После прохождения по массивы выводим результат вычислений с помощью метод result().

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Метод result попросту возвращает верхний элемент стека. Таким образом, он возвращает либо результат предыдущей операции,
либо последний добавленный операнд в стек, в случае если ни одной операции не совершалось.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Операции вставки и удаления из стека выполняются за O(1);
Операция вычисления выполняется так же за O(1)

В среднем для k - кол-во операндов, получаем O(k) / k ~ O(1) -- амортизированная сложность.

Общая сложность растет линейно с увеличением количества входных данных: O(n)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
В худшем случае если ввод содержит одни операнды, стек займет O(n) памяти

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
    const arr = readArray();
    const polishNotationCalc = new PolishNotationCalc();

    for (let i = 0; i <= arr.length - 1; i++) {
        const item = arr[i];
        if (typeof item === 'number') {
            polishNotationCalc.push(item);
            continue;
        }
        polishNotationCalc.calc(item);
    }

    process.stdout.write(`${polishNotationCalc.result()}`)
}

function readArray() {
    let arr = _inputLines[_curLine].trim(" ").split(" ").map(symbol => {
        const parsed = Number(symbol);
        return Number.isInteger(parsed) ? parsed : symbol;
    });
    _curLine++;
    return arr;
}

class PolishNotationCalc {
    constructor() {
        this.stack = []
    }

    operators = {
        '-': (a, b) => a - b,
        '+': (a, b) => a + b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.floor(a / b)
    }

    push(value) {
        this.stack.push(value);
    }

    calc(operator) {
        const operand2 = this._pop();
        const operand1 = this._pop();

        const fn = this.operators[operator];
        if (!fn || typeof fn !== 'function') {
            throw new Error('operation is not supported');
        }

        const result = this.operators[operator].call(this, operand1, operand2);
        this.stack.push(result);

        return result;
    }

    result() {
        return this.stack[this.stack.length - 1];
    }

    _pop() {
        if (!this.stack.length) {
            return 'error';
        }

        return this.stack.pop();
    }
}
