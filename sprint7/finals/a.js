/**
 № 67474446
 -- ПРИНЦИП РАБОТЫ --
 Для решения задачи используем динамическое программирование. Ответим на 5 вопросов:
 1. Что будет храниться в массиве dp?
    — в dp[i][j] хранится минимальное количество атомарных изменений для префиксов A[1..i - 1] и B[i..j - 1]

 2. Каким будет базовый случай для задачи?
    Случаи пустых строк
    — dp[0][0] = 0;
    — dp[0][j] = j, dp[i][0] = i

 3. Каким будет переход динамики?
    Если последние символы префиксов равны, то:
        dp[i][j] = dp[i - 1][j - 1]
    Иначе:
        dp[i][j] = Min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
        Выбирается минимальное значение 3х возможных вариантов: замены, удаления и добавления последнего символа.

 4. Каким будет порядок вычисления данных в массиве dp?
    — Заполняем массив сверху - вниз, слева - направо.

 5. Где будет располагаться ответ на исходный вопрос?
    — В нижнем правом углу матрицы.

 -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
 O(n * m), n - длина строки A, m - длина строки B

 -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
 O(n * m)

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
    const A = readString();
    const B = readString();

    const dp = Array.from(Array(A.length + 1), () => new Array(B.length + 1));

    for (let i = 0; i <= A.length; i++) {
        for (let j = 0; j <= B.length; j++) {
            if (i === 0 || j ===0) {
                dp[i][j] = i + j;
                continue;
            }

            if (A[i - 1] === B[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
                continue;
            }

            dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
        }
    }

    const result = dp[A.length][B.length];

    process.stdout.write(`${result}`);
}

function readString() {
    const s = _inputLines[_curLine];
    _curLine++;
    return s;
}
