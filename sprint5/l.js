function siftDown(heap, idx) {
    const left = idx * 2;
    const right = idx * 2 + 1;
    let indexLargest;

    if (heap.length < left) {
        return idx;
    }

    if (right <= heap.length && heap[left] < heap[right]) {
        indexLargest = right;
    } else {
        indexLargest = left;
    }

    if (heap[idx] < heap[indexLargest]) {
        const temp = heap[idx];
        heap[idx] = heap[indexLargest];
        heap[indexLargest] = temp;

        return siftDown(heap, indexLargest);
    }

    return idx;
}
