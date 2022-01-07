/*
Comment it before submitting
 */

/*
class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}
*/

function getNodeByIndex(node, index) {
    let nextNode = node
    let i = index
    while (i) {
        nextNode = nextNode.next;
        i = i - 1;
    }

    return nextNode;
}

function solution(head, idx) {
    if (idx === 0) {
        return head.next;
    }
    const prevNode = getNodeByIndex(head,idx - 1)
    const nodeToRemove = prevNode.next;
    prevNode.next = nodeToRemove.next;

    return head;
}
/*
function printList(head) {
    let currentNode = head;
    while (currentNode) {
        console.log(currentNode.value);
        currentNode = currentNode.next;
    }
}

function test() {
    var node3 = new Node("node3");
    var node2 = new Node("node2", node3);
    var node1 = new Node("node1", node2);
    var node0 = new Node("node0", node1);
    var newHead = solution(node0, 0);
    printList(newHead)
    // result is node0 -> node2 -> node3
}

test();*/
