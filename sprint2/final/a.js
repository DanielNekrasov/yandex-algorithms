/*
№ 63479474

-- ПРИНЦИП РАБОТЫ --
Решение задачи построено на основе алгоритма "Очередь на кольцевом буфере", рассмотренного в материалах спринта.
Разница заключается в том, что в деке возможно обратное - против часовой стрелки - перемещение буфера.
В пустом деке и голова, и хвост указывают на ячейку с индексом 0:
                            [_, _, _, _, _, _, _]
                             |
                            head, tail

При непустом:
head — индекс указывает на первый элемент в деке;
tail — индекс, следующий за последним элементом в деке;

                            [_, *, *, *, _, _, _]
                                |        |
                               head     tail

Операции pushBack и popFront осуществляют движение буфера по часовой стрелки. Аналогичны операциям push и pop в простой очереди.
Операции pushFront и popBack осуществляют противоположное движение буфера.
При этом, при обратном движении, сначала вычисляются индексы head и tail, а затем производятся операции присваивания.
Также отдельно обрабатывается обратное движение при нулевом индексе. Для того чтобы последний элемент следовал за первым.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Операции pushBack – popBack и pushFront – popFront являются обратными c точки зрения производимых операций над деком
и его переменными.
Не уверен, что этого достаточно для доказательства :)

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Из-за того, что не нужно снова выделять память, каждая операция выполняется за O(1).
Длинна дека также вычисляется попутно с добавлением / извлечением.
Итоговая временная сложность равна O(n), где n - число операций.

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Так как размер нашего дека не изменяется динамически, дек с вместимостью n, занимает O(n) памяти.

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


function callDecFunction(instance, command, arg) {
    switch (command) {
        case "pop_front":
            return instance.popFront()
        case "push_front":
            return instance.pushFront(arg)
        case "pop_back":
            return instance.popBack()
        case "push_back":
            return instance.pushBack(arg)
    }
}

function solve() {
    const commandsCount = readInt()
    const maxSize = readInt()

    const dec = new Dec(maxSize);

    for (let i = 0; i <= commandsCount - 1; i++) {
        const [fn, arg] = readCommand();

        try {
            const result = callDecFunction(dec, fn, arg);
            if (result !== undefined) {
                process.stdout.write(`${result}`)
                process.stdout.write("\n");
            }
        } catch (e) {
            process.stdout.write(`${e.message}`)
            process.stdout.write("\n");
        }
    }
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readCommand() {
    let [command, arg] = _inputLines[_curLine].trim(" ").split(" ");

    _curLine++;
    return [command, Number(arg)];
}

class Dec {
    constructor(capacity) {
        this.capacity = capacity
        this.items = new Array(capacity);
        this.head = 0
        this.tail = 0
        this.size = 0
    }

    isEmpty() {
        return this.size === 0;
    }

    isFull() {
        return this.size === this.capacity;
    }

    pushBack(x) {
        if (this.isFull()) {
            throw new Error('error');
        }

        this.items[this.tail] = x
        this.tail = (this.tail + 1) % this.capacity

        this.size++;
    }

    pushFront(x) {
        if (this.isFull()) {
            throw new Error('error');
        }

        this.head = (this.head === 0 ? this.capacity : 0) + this.head - 1;
        this.items[this.head] = x;
        this.size++
    }

    popBack() {
        if (this.isEmpty()) {
            throw new Error('error');
        }

        this.tail = this.tail - 1 + (this.tail === 0 ? this.capacity : 0);
        const x = this.items[this.tail];
        this.items[this.tail] = undefined;
        this.size--

        return x;
    }

    popFront() {
        if (this.isEmpty()) {
            throw new Error('error');
        }

        const x = this.items[this.head];
        this.items[this.head] = undefined;
        this.head = (this.head + 1) % this.capacity
        this.size--;

        return x;
    }
}
