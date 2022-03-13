/**
Comment it before submitting

class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
 **/

function printRange(root, left, right) {
    if (root.value >= left) {
        if (root.left !== null) {
            printRange(root.left, left, right)
        }
    }

    if (root.value >= left && root.value <= right) {
        console.log(root.value);
    }

    if (root.value <= right) {
        if (root.right !== null) {
            printRange(root.right, left, right)
        }
    }
}

