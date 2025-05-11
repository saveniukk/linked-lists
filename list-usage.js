const CircularLinkedList = require('./circular-linked-list');

const list = new CircularLinkedList();

// append(value)
list.append('A');
list.append('B');
list.append('C');
list.append('B');
console.log('Після append:', list.get(0), list.get(1), list.get(2), list.get(3)); // 'A', 'B', 'C', 'B'

// insert(value, index)
list.insert('cat', 1);
console.log('Після insert("cat", 1) індекс 1 має елемент:', list.get(1)) // 'cat'

// getLength()
console.log('Довжина списку:', list.getLength()); // 5

// get(index)
console.log('Елемент з індексом 2:', list.get(2)); // 'B'

// findFirst(element)
console.log('Індекс першого елемента "B":', list.findFirst('B')); // 2

// findLast(element)
console.log('Індекс останнього елемента "B":', list.findLast('B')); // 4

// delete(index)
console.log('Перед delete(1) індекс 1 має елемент:', list.get(1), 'Довжина списку:', list.getLength()); // 'cat', 5
list.delete(1);
console.log('Після delete(1) індекс 1 має елемент:', list.get(1), 'Довжина списку:', list.getLength()); // 'B', 4

// deleteAll(element)
console.log('Перед deleteAll("B"):', list.get(0), list.get(1), list.get(2), list.get(3)); // 'A', 'B', 'C', 'B'
list.deleteAll('B');
console.log('Після deleteAll("B"):', list.get(0), list.get(1)); // 'A', 'C'

// reverse()
list.reverse();
console.log('Після використання reverse():', list.get(0), list.get(1)); // 'C', 'A'

// extend(list)
const list2 = new CircularLinkedList();
list2.append(1);
list2.append(2);

list.extend(list2);
console.log('Список після розширення:', list.get(0), list.get(1), list.get(2), list.get(3)); // 'C', 'A', 1, 2
console.log('Другий список після extend() залишається незмінним:', list2.get(0), list2.get(1)); // 1, 2

// clone()
const clonedList = list.clone();
console.log('Клонований список:', clonedList.get(0), clonedList.get(1), clonedList.get(2), clonedList.get(3)); // 'C', 'A', 1, 2

// clear()
list.clear()
console.log('Довжина списку після clear():', list.getLength()); // 0