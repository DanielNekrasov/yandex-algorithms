class CNode {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

function solution(root) {
    const meta = {maxPath: Number.MIN_SAFE_INTEGER};
    getMaxPath(root, meta);
    return meta.maxPath;
}

function getMaxPath(node, props) {
    if (node === null) {
        return 0;
    }

    const leftSum = Math.max(getMaxPath(node.left, props), 0)
    const rightSum = Math.max(getMaxPath(node.right, props), 0)

    props.maxPath = Math.max(props.maxPath, leftSum + rightSum + node.value)

    return node.value + Math.max(leftSum, rightSum)
}

function test() {
    var node1 = new CNode(5, null, null);
    var node2 = new CNode(1, null, null);
    var node3 = new CNode(-3, node2, node1);
    var node4 = new CNode(2, null, null);
    var node5 = new CNode(2, node4, node3);
    console.assert(solution(node5) === 6);
}
