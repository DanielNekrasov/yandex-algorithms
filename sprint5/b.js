// class CNode {
//     constructor(value) {
//         this.value = value;
//         this.left = null;
//         this.right = null;
//     }
// }

function solution(root) {
    return isBalanced(root);
}

function height(root){
    if (root === null) {
        return 0
    }
    return Math.max(height(root.left), height(root.right)) + 1
}

function isBalanced(root){
    if (root === null) {
        return true
    }

    let leftHeight = height(root.left)
    let rightHeight = height(root.right)

    return Math.abs(leftHeight - rightHeight) <= 1 && isBalanced(root.left) && isBalanced(root.right);
}
