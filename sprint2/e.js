/*
Comment it before submitting
*/

/*class Node {
  constructor(value = null, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}*/

function solution(node) {
    let currentNode = node;
    while (currentNode) {
        const temp = currentNode.next;
        currentNode.next = currentNode.prev;
        currentNode.prev = temp;

        if (!currentNode.prev) {
            return currentNode;
        }
        currentNode = currentNode.prev;
    }

    return currentNode;
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
    node1.prev = node0;
    node2.prev = node1;
    node3.prev = node2;
    var newHead = solution(node0);
    /!*
    result is newHead === node3
    node0.prev === node1
    node1.next === node0
    node1.prev === node2
    node2.next === node1
    node2.prev === node3
    node3.next === node2
    *!/
}*/
