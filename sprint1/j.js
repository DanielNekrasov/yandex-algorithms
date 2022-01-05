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

function* primeGenerator(n){
    const lp = [];
    const primes = [];

    for (let i = 2; i <= n + 1; i++) {
        if (!lp[i]) {
            lp[i] = i;
            primes.push(i);
            yield i;
        }
        for (let j = 0; j <= primes.length - 1; j++) {
            const p = primes[j];
            const x = p * i;
            if (p > lp[i] || (x > n)) {
                break;
            }
            lp[x] = p;
        }
    }
}

function isPrime(n) {
    if (n === 1) {
        return false;
    }
    let i = 2;
    while (i * i <= n) {
        if (n % i === 0) {
            return false
        }
        i++;
    }
    return true
}

function factorize(number) {
    let factors = [];
    let modulo = number;
    let primeGen = primeGenerator(modulo);

    while (!isPrime(modulo)) {
        const {value: nextSimple} = primeGen.next()
        if (modulo % nextSimple === 0) {
            factors = [...factors, nextSimple];
            modulo = modulo / nextSimple
            primeGen = primeGenerator(modulo);
        }
    }

    return [...factors, modulo];
}

function solve() {
    const number = readInt();
    const factorization = factorize(number)
    process.stdout.write(`${factorization.join(' ')}`);
}

function readInt() {
    const n = Number(_inputLines[_curLine]);
    _curLine++;
    return n;
}

function readArray() {
    var arr = _inputLines[_curLine].trim(" ").split(" ").map(num => Number(num));
    _curLine++;
    return arr;
}
