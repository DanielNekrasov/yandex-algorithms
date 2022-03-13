// class CNode {
//     constructor(value) {
//         this.value = value;
//         this.left = null;
//         this.right = null;
//     }
// }

function solution(root) {
    return check(root, null, null);
}

function check(root, l, r) {
     if (root == null)
        return true;

    if (l != null && root.value <= l.value)
        return false;

    if (r != null && root.value >= r.value)
        return false;

    return check(root.left, l, root) &&
        check(root.right, root, r);
}

// function test() {
//     var node1 = new CNode(1, null, null);
//     var node2 = new CNode(4, null, null);
//     var node3 = new CNode(3, node1, node2);
//     var node4 = new CNode(5, null, null);
//     var node5 = new CNode(5, node3, node4);
//
//     console.assert(solution(node5));
//     node4.value = 5;
//     console.assert(!solution(node5));
// }
//
// test();
