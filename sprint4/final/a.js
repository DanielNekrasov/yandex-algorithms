/*
№ 65052592

-- ПРИНЦИП РАБОТЫ --
В первую очередь строится словарь (createDocsDict()), который содержит кол-во совпадений каждого слова из всех документов для каждого документа:
{"слово" => {"# документа" => число вхождений в документ}}
Затем, на основе этого словаря для каждой фразы вычисляются релевантные документы calcRelevant().

n - число документов
nl - средняя длина документа
m - число запросов
ml - число символов в запросе

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Cоставление поискового индекса - O(n × nl)
Обработка каждого запроса - O(m × ml + m × n × log n ))
Так как вкладом констант ml и nl можно пренебречь, а скорость роста m*n*log n выше (n + m) - итоговая временная сложность равна O(m*n*log n)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Функций solve:
Массив, содержащий все слова в n документах (docsList): nl * n
Массив, со словами из всех запросах (phrasesList): ml * m
Словарь (docsDict): nl * n

Для каждого запроса выделяется (calcRelevant):
O(ml) - память под хранение множества уникальных слов
O(n) - память под хэш-таблицу с релевантностным распределением этих слов по документам
Сортировка не требует дополнительной памяти, кроме памяти на рекурсивные вызовы, в худшем случае O(n) (предполагая что внутри js использует быструю сортировку)
Так как после обработки каждого запроса память "освобождается", то максимально на все обработки запросов требуется (ml + n + n) памяти.
Функция calcRelevant возвращает массив length = 5; Так как результат печатается сразу в цикле, result так же "освобождается" на каждой итерации

Суммарно получаем: O(nl * n + nl * n + ml * m + (ml + n + n) + 5 =>  если принять ml и nl за константу, то в итоге получается O(m + n)
* */

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

const RELEVANT_NUMBER = 5;

function solve() {
    let docsList = [];
    let phrasesList = [];

    const docsNum = readInt();
    for (let i = 0; i <= docsNum - 1; i++) {
        docsList.push(readStr());
    }

    const phrasesNum = readInt();
    for (let i = 0; i <= phrasesNum - 1; i++) {
        phrasesList.push(readStr());
    }

    const docsDict = createDocsDict(docsList);

    phrasesList.forEach(phrase => {
        const result = calcRelevant(phrase, docsDict, RELEVANT_NUMBER)
        process.stdout.write(`${result.join(' ')}`)
        process.stdout.write(`\n`)
    })
}

function createDocsDict(docsList) {
    const docsArr = docsList.map(splitString); // O(n * nl)
    const dict = new Map();

    for (let indexDoc = 0; indexDoc <= docsArr.length - 1; indexDoc++) {
        for (let i = 0; i <= docsArr[indexDoc].length - 1; i++) {
            const word = docsArr[indexDoc][i];
            if (!dict.has(word)) {
                dict.set(word, new Map([[indexDoc, 0]]))
            }
            const wordDict = dict.get(word);
            if (!wordDict.has(indexDoc)) {
                wordDict.set(indexDoc, 0)
            }
            wordDict.set(indexDoc, wordDict.get(indexDoc) + 1)
        }
    }

    return dict;
}

function calcRelevant(phrase, docsDict, relevantNumber) {
    let count = 0;
    const wordsSet = new Set(splitString(phrase));
    const relevantMap = new Map();

    for (let word of wordsSet) {
        docsDict.get(word)?.forEach((count, docIndex) => {
            if (!relevantMap.has(docIndex)) {
                relevantMap.set(docIndex, 0);
            }
            relevantMap.set(docIndex, relevantMap.get(docIndex) + count);
        });
    }

    relevantMap[Symbol.iterator] = function* () {
        yield* [...this].sort((a, b) => {
            if (a[1] === b[1]) {
                return a[0] - b[0];
            }
            return b[1] - a[1]
        });
    }

    let result = [];
    for (let [key, value] of relevantMap) {
        result = [...result, key + 1];
        count++;

        if (count >= relevantNumber) {
            break;
        }
    }

    return result;
}

function splitString(str) {
    return str.trim(" ").split(" ");
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readStr() {
    let arr = _inputLines[_curLine];
    _curLine++;
    return arr;
}
