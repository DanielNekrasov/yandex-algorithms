// class CNode {
//     constructor(value, left = null, right = null) {
//         this.value = value;
//         this.left = left;
//         this.right = right;
//     }
// }

function solution(root) {
    const values = LMR(root);
    return isAnagram(values);
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

function isAnagram(arr) {
    if (arr.length % 2 === 0) {
        return false;
    }

    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        if (arr[i] !== arr[arr.length - 1 - i]) {
            return false;
        }
    }

    return true;
}

// function test() {
//     var node3 = new CNode(3,  null,  null);
//     var node2 = new CNode(1,  node3,  null);
//     var node1 = new CNode(1,  null,  null);
//     var node0 = new CNode(1,  node2,  node1);
//     console.assert(solution(node0));
// }

// test();
