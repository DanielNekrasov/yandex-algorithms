/*
ID 64742408
-- ПРИНЦИП РАБОТЫ --
Алгоритм построен на рекурсивном бинарном поиске.
При этом, при выборе следующей части для поиска проверяется сторона в которой находится смещение кольцевого массива.
Возможны 3 случая:
1. l <= m < r - массив не смещен
Дальше идем по обычной схеме бинарного поиска

2. l >= m < r - массив смещен слева
Проверяем находится ли искомый элемент в правом интервале.
Если да – обычный поиск в правом НЕ смещенном интервале.
Иначе в левом смешенном.

3. l <= m > r - массив смещен справа
Аналогично 2-му пункту.

Добавил флаг broken для указания того, смещен ли интервал или нет.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
O(log n), n - кол-во входных данных

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Глубина рекурсии составляет O(log n). На каждом уровне рекурсии выделяется O(1) дополнительной памяти: адрес возврата, аргументы функции и локальные переменные (mid)
O(log n) - пространственная сложность

*/
function brokenSearch(arr, k) {
    return brokenBinarySearch(arr, k, 0, arr.length - 1)
}

function brokenBinarySearch(arr, k, left, right, broken = true) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === k) {
        return mid
    }

    if (arr[left] === k) {
        return left
    }

    if (arr[right] === k) {
        return right
    }

    if (right <= left) {
        return -1;
    }

    // 1. l <= m < r - массив не сломан
    if (!broken || arr[left] <= arr[mid] && arr[mid] < arr[right]) {
        if (arr[mid] > k) {
            return brokenBinarySearch(arr, k, left, mid, false);
        }

        return brokenBinarySearch(arr, k,mid + 1, right, false);
    }

    // 2. l >= m < r - массив сломан слева
    if (arr[left] >= arr[mid] && arr[mid] < arr[right]) {
        if (k > arr[mid] && k <= arr[right]) {
            return brokenBinarySearch(arr, k, mid + 1, right, false); // Поиск на НЕ сломанном правом интервале
        }

        return brokenBinarySearch(arr, k, left, mid);
    }

    // 3. l <= m > r - массив сломан справа
    if (arr[left] <= arr[mid] && arr[mid] > arr[right]) {
        if (k < arr[mid] && k >= arr[left]) {
            return brokenBinarySearch(arr, k, left, mid, false); // Поиск на НЕ сломанном левом интервале
        }

        return brokenBinarySearch(arr, k, mid + 1, right);
    }
}
