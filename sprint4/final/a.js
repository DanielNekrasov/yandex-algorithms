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
    const docsArr = docsList.map(splitString);
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
    const map = new Map();

    for (let word of wordsSet) {
        docsDict.get(word)?.forEach((count, docIndex) => {
            if (!map.has(docIndex)) {
                map.set(docIndex, 0);
            }
            map.set(docIndex, map.get(docIndex) + count);
        });
    }

    map[Symbol.iterator] = function* () {
        yield* [...this.entries()].sort((a, b) => {
            if (a[1] === b[1]) {
                return a[0] - b[0];
            }
            return b[1] - a[1]
        });
    }

    let result = [];
    for (let [key, value] of map) {
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
