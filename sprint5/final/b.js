/**
 № 66238420

 -- ПРИНЦИП РАБОТЫ --
 Рассматриваются 4 базовых случая при удалении вершины:
 1. У вершины нет дочерних элементов
 2. Есть только левый ребенок
 3. Есть только правый ребенок
 4. Есть оба ребенка

 В случаях 1-3 достаточно заменить удаляемые элемент на его ребенка (или null, если его нет);
 Если есть оба ребенка применяется алгоритм описанный в теории:
 1. Находится потомок (P), который может заменить удаляемый элемент – максимальное значение в левом поддереве;
 2. Удаляем вершину (P) со старого места
    - В случае если у P есть левый ребенок, надо чтобы P.parent.right усыновил его вместо P
 3. У родителя вершины D меняем ребёнка D на P
 4. Вершине P присваиваем детей D

 Функции findNode и getMaxProgenyInLeftSubtree возвращают [элемент, родитель элемента]

 -- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
 Удаляемый узел может иметь от 0 до 3-x ребер. Соответственно при его удалении дерево может быть разъединено до 3х отдельных деревьев.
 Алгоритм учитывает все эти варианты.

 P.S. Постоянно испытываю сложность при описании этого пункта. Что именно тут должно быть? Достаточно ли описания принципа работы?

 -- ВРЕМЕННАЯ СЛОЖНОСТЬ --
    * Функция поиска элемента findNode – O(h).
     В худшем случае в несбалансированном дереве – O(n). Асимптотическая сложность – O(log n)

    * Функция поиска потомка getMaxProgenyInLeftSubtree – O(h1). где h1 - высота левого поддерева от удаляемой вершины. Сложность аналогична findNode.
    * Функция _replaceChild – O(1)

 Общая временная сложность удаления узла – O(h). Асимптотическая сложность – O(log n). В худшем O(n).
 Складывается из сложностей описанных выше функций и константных операция при замене потомков.

 -- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
    * O(n) на хранение элементов бинарного дерева.
    * findNode, getMaxProgenyInLeftSubtree - O(1). Используется итерационная реализация, таким образом алгоритм не расходует дополнительную память на поддержание стека вызовов как при рекурсивном алгоритме.
    * _replaceChild - O(1)
    * remove - O(1)

    Итого: O(n)
*/


class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class BinarySearchTree {
    constructor(root) {
        this.root = root
    }

    remove(key) {
        const [d, dParent] = this.findNode(key);

        if (d === null) {
            return this.root;
        }

        // Нет дочерних узлов или есть один (условия 1 - 3)
        if (!(d.left !== null && d.right !== null)) {
            const child = d.left || d.right;

            this._replaceChild(dParent, d, child)

            if (dParent === null) {
                this.root = child;
            }

            return this.root;
        }

        // Иначе есть оба дочерних узла. Находим P.
        const [p, pParent] = this.getMaxProgenyInLeftSubtree(d);

        // Проверяем, что удаляемая вершина и родитель P не являются одним и тем же элементом
        if (pParent !== d) {
            // Удаляем вершину P со старого места, если у нее есть левый потомок – заменяем на него.
            pParent.right = p.left;
        }

        // У родителя вершины D меняем ребёнка D на P
        this._replaceChild(dParent, d, p)

        if (dParent === null) {
            this.root = p;
        }

        // Вершине P присваиваем детей D:
        if (pParent !== d) {
            p.left = d.left;
        }

        p.right = d.right;

        return this.root;
    }

    _replaceChild(parent, child, newChild) {
        if (parent === null) {
            return;
        }

        if (parent.left === child) {
            parent.left = newChild;
        }

        if (parent.right === child) {
            parent.right = newChild;
        }
    }

    findNode(key) {
        let node = this.root;
        let parent = null;

        while (node) {
            if (node.value === key) {
                return [node, parent];
            }

            parent = node;

            if (node.value > key) {
                node = node.left;
            } else {
                node = node.right;
            }
        }

        return [null, null];
    }

    getMaxProgenyInLeftSubtree(root) {
        if (root.left === null) {
            return [null, null];
        }

        let node = root.left;
        let parent = root;

        while (node && node.right) {
            parent = node;
            node = node.right;
        }

        return [node, parent];
    }
}

function remove(node, key) {
    const bst = new BinarySearchTree(node);
    return bst.remove(key);
}

function test() {
    var node1 = new Node(2, null, null);
    var node2 = new Node(3, node1, null);
    var node3 = new Node(1, null, node2);
    var node4 = new Node(6, null, null);
    var node5 = new Node(8, node4, null);
    var node6 = new Node(10, node5, null);
    var node7 = new Node(5, node3, node6);
    var newHead = remove(node7, 10);

    console.assert(newHead.value === 5);
    console.assert(newHead.right === node5);
    console.assert(newHead.right.value === 8);
}
