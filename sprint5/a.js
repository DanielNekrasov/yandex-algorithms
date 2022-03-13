// class CNode {
//     constructor(value) {
//         this.value = value;
//         this.left = null;
//         this.right = null;
//     }
// }


function solution(root) {
    function branch(node) {
        let value = node.value;
        if (node.left) {
            const leftValue = branch(node.left)
            if (leftValue > value) {
                value = leftValue;
            }
        }
        if (node.right) {
            const rightValue = branch(node.right)
            if (rightValue > value) {
                value = rightValue;
            }
        }

        return value;
    }

    return branch(root);
}

// function test() {
//     var node1 = new CNode(1);
//     var node2 = new CNode(-5);
//     var node3 = new CNode(3);
//     node3.left = node1;
//     node3.right = node2;
//     var node4 = new CNode(2);
//     node4.left = node3;
//     const result = solution(node4);
//     console.assert(result === 3);
// }
//
// test();
