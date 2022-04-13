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
        const M = readInt();
        const n = readInt();
        const heaps = [];
        for (let i = 0; i < n; i++) {
            heaps.push(readArray(2));
        }

        heaps.sort((a, b) => a[0] > b[0] ? -1 : a[0] < b[0] ? 1 : 0);

        let weight = 0;
        let total = 0;
        let h = 0;

        while (weight < M && h < n) {
            const [c, m] = heaps[h];

            for (let i = 0; i < m && weight < M; i++) {
                weight += 1;
                total += c;
            }
            h++;
        }
        console.log(total);
    }


    function readArray(limit) {
        var arr = _inputLines[_curLine].trim(" ").split(" ", limit).map(i => Number(i));
        _curLine++;
        return arr;
    }

    function readInt() {
        const n = Number(_inputLines[_curLine]);
        _curLine++;
        return n;
    }
