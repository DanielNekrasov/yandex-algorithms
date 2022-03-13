// class CNode {
//     constructor(value, left = null, right = null) {
//         this.value = value;
//         this.left = left;
//         this.right = right;
//     }
// }

function solution(root1, root2) {
    const arr1 = LMR(root1);
    const arr2 = LMR(root2);
    return areEqual(arr1, arr2)
}

function LMR(vertex) {
    let stack = [];
    if (vertex.left !== null) {
        stack.push(...LMR(vertex.left))
    }

    stack.push(vertex.value);

    if (vertex.right !== null) {
        stack.push(...LMR(vertex.right))
    }

    return stack;
}

function areEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false
        }
    }

    return true;
}

// function test() {
//     var node1 = new CNode(1,  null,  null);
//     var node2 = new CNode(2,  null,  null);
//     var node3 = new CNode(3,  node1,  node2);
//
//     var node4 = new CNode(1,  null,  null);
//     var node5 = new CNode(2,  null,  null);
//     var node6 = new CNode(3,  node4,  node5);
//
//     console.assert(solution(node3, node6));
// }
