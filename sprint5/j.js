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

function insert(node, key) {
    keyInsert(node, key);
    return node;
}

function keyInsert(node, key) {
    if (key >= node.value) {
        if (node.right === null) {
            node.right = new Node(key);
        } else {
            keyInsert(node.right, key)
        }
    } else {
        if (node.left === null) {
            node.left = new Node(key);
        } else {
            keyInsert(node.left, key)
        }
    }
}
