const CircularLinkedList = require('./circular-linked-list');

describe('append method', () => {
    let list;

    beforeEach(() => {
        list = new CircularLinkedList();
    });

    test('додавання першого елементу до порожнього списку', () => {
        const value = 'A';

        list.append(value);

        expect(list.getLength()).toBe(1);
        expect(list.head.value).toBe(value);
        expect(list.tail.value).toBe(value);
        expect(list.head.next).toBe(list.head);
        expect(list.tail.next).toBe(list.head);
    });

    test('додавання другого елементу до списку', () => {
        const value1 = 'A';
        const value2 = 'B';

        list.append(value1);
        list.append(value2);

        expect(list.getLength()).toBe(2);
        expect(list.head.value).toBe(value1);
        expect(list.tail.value).toBe(value2);
        expect(list.head.next.value).toBe(value2);
        expect(list.tail.next.value).toBe(value1);
        expect(list.tail.next).toBe(list.head);
    });

    test('додавання декількох елементів до списку', () => {
        const value1 = 1;
        const value2 = 2;
        const value3 = 3;

        list.append(value1);
        list.append(value2);
        list.append(value3);

        expect(list.getLength()).toBe(3);
        expect(list.head.value).toBe(value1);
        expect(list.head.next.value).toBe(value2);
        expect(list.tail.value).toBe(value3);
        expect(list.tail.next).toBe(list.head);
    })
});

describe('getLength method', () => {
    let list;

    beforeEach(() => {
        list = new CircularLinkedList();
    });

    test('отримання довжини порожнього списку', () => {
        expect(list.getLength()).toBe(0);
    });

    test('отримання правильної довжини після додавання елементів', () => {
    list.append('A');
    list.append('B');
    list.append('C');

    const length = list.getLength();

    expect(length).toBe(3);
    });
});

describe('get method', () => {
    let list;
    beforeEach(() => {
        list = new CircularLinkedList();
        list.append('A');
        list.append('B');
        list.append('C');
    });

    test('повернення правильного значення за індексом', () => {
        expect(list.get(0)).toBe('A');
        expect(list.get(1)).toBe('B');
        expect(list.get(2)).toBe('C');
    });

    test('повернення повідомлення про помилку при негативному індексі', () => {
        expect(list.get(-1)).toBe('Incorrect index of the element');
    });

    test('повернення повідомлення про помилку при індексі > кількість елементів', () => {
        expect(list.get(3)).toBe('Incorrect index of the element');
        expect(list.get(10)).toBe('Incorrect index of the element');
    })

    test('повернення повідомлення про помилку при не цілому індексі', () => {
        expect(list.get(1.5)).toBe('Incorrect index of the element');
        expect(list.get('A')).toBe('Incorrect index of the element');
        expect(list.get(true)).toBe('Incorrect index of the element');
    })
});

describe('insert method', () => {
    let list;

    beforeEach(() => {
        list = new CircularLinkedList();
    });

    test('вставка в порожній список на 0 позицію', () => {
        list.insert('A', 0);

        expect(list.getLength()).toBe(1);
        expect(list.head.value).toBe('A');
        expect(list.tail.value).toBe('A');
        expect(list.head.next).toBe(list.head);
    });

    test('вставка на 0 позицію в не порожній список', () => {
        list.append('B');
        list.append('C');

        list.insert('A', 0);

        expect(list.getLength()).toBe(3);
        expect(list.get(0)).toBe('A');
        expect(list.get(1)).toBe('B');
        expect(list.get(2)).toBe('C');
        expect(list.head.value).toBe('A');
        expect(list.head.next.value).toBe('B');
        expect(list.tail.value).toBe('C');
        expect(list.tail.next).toBe(list.head);
    });

    test('вставка в кінець списку', () => {
        list.append('A');
        list.append('B');

        list.insert('C', 2);

        expect(list.getLength()).toBe(3);
        expect(list.get(0)).toBe('A');
        expect(list.get(1)).toBe('B');
        expect(list.get(2)).toBe('C');
        expect(list.tail.value).toBe('C');
        expect(list.tail.next).toBe(list.head);
    });

    test('вставка декількох елементів в різні позиції', () => {
        list.insert('A', 0);
        list.insert('C', 1);
        list.insert('B', 1);
        list.insert('D', 3);
        list.insert('X', 0)

        expect(list.getLength()).toBe(5);
        expect(list.get(0)).toBe('X');
        expect(list.get(1)).toBe('A');
        expect(list.get(2)).toBe('B');
        expect(list.get(3)).toBe('C');
        expect(list.get(4)).toBe('D');
        expect(list.tail.value).toBe('D');
        expect(list.head.value).toBe('X');
        expect(list.tail.next).toBe(list.head);
    });

    test('повернення повідомлення про помилку при негативному індексі', () => {
        list.append('B');

        expect(list.insert('A', -1)).toBe('Incorrect index of the element');
    });

    test('повернення повідомлення про помилку при індексі > кількість елементів', () => {
        list.append('A');
        list.append('B');

        expect(list.insert('C', 3)).toBe('Incorrect index of the element');
        expect(list.insert('C', 10)).toBe('Incorrect index of the element');
    });

    test('повернення повідомлення про помилку при не цілому індексі', () => {
        list.append('A');
        list.append('B');

        expect(list.insert('A', 1.5)).toBe('Incorrect index of the element');
        expect(list.insert('A', 'index')).toBe('Incorrect index of the element');
        expect(list.insert('A', null)).toBe('Incorrect index of the element');
        expect(list.insert('A', undefined)).toBe('Incorrect index of the element');
        expect(list.insert('A', {})).toBe('Incorrect index of the element');
    });
});

describe('delete method', () => {
    let list;

    beforeEach(() => {
        list = new CircularLinkedList();
    });

    test('спроба видалення з порожнього списку', () => {
        expect(list.delete(0)).toBe('Incorrect index of the element');
    });

    test('спроба видалення з некоректним індексом', () => {
        list.append('A');

        expect(list.delete(-1)).toBe('Incorrect index of the element');
        expect(list.delete(1)).toBe('Incorrect index of the element');
        expect(list.delete(1.5)).toBe('Incorrect index of the element');
        expect(list.delete('A')).toBe('Incorrect index of the element');
    });

    test('видалення єдиного елементу зі списку', () => {
        list.append('A');

        const deleted = list.delete(0);

        expect(deleted).toBe('A');
        expect(list.getLength()).toBe(0);
        expect(list.head).toBeNull();
        expect(list.tail).toBeNull();
    });

    test('видалення елемента з індексом 0 з не порожнього списку', () => {
        list.append('A');
        list.append('B');
        list.append('C');

        const deleted = list.delete(0);

        expect(deleted).toBe('A');
        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('B');
        expect(list.get(1)).toBe('C');
        expect(list.head.value).toBe('B');
        expect(list.tail.value).toBe('C');
        expect(list.tail.next).toBe(list.head);
    });

    test('видалення останнього елемента з не порожнього списку', () => {
        list.append('A');
        list.append('B');
        list.append('C');

        const deleted = list.delete(2);

        expect(deleted).toBe('C');
        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('A');
        expect(list.get(1)).toBe('B');
        expect(list.head.value).toBe('A');
        expect(list.tail.value).toBe('B');
        expect(list.tail.next).toBe(list.head);
    });

    test('видалення елемента з середини списку', () => {
        list.append('A');
        list.append('B');
        list.append('C');
        list.append('D');

        const deleted = list.delete(1);

        expect(deleted).toBe('B');
        expect(list.getLength()).toBe(3);
        expect(list.get(0)).toBe('A');
        expect(list.get(1)).toBe('C');
        expect(list.get(2)).toBe('D');
        expect(list.head.value).toBe('A');
        expect(list.tail.value).toBe('D');
        expect(list.tail.next).toBe(list.head);
    });

    test('послідовне видалення всіх елементів', () => {
        list.append('A');
        list.append('B');
        list.append('C');

        expect(list.delete(0)).toBe('A');
        expect(list.delete(1)).toBe('C');
        expect(list.delete(0)).toBe('B');
        expect(list.getLength()).toBe(0);
        expect(list.head).toBeNull();
        expect(list.tail).toBeNull();
    });
});

describe('deleteAll method', () => {
    let list;

    beforeEach(() => {
        list = new CircularLinkedList();
    });

    test('видалення з порожнього списку', () => {
        list.deleteAll('A');
        expect(list.getLength()).toBe(0);
        expect(list.head).toBeNull();
    });

    test('видалення елемента, якого немає в списку', () => {
        list.append('A');
        list.append('B');

        list.deleteAll('C');

        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('A');
        expect(list.get(1)).toBe('B');
    });

    test('видалення єдиного елемента (на початку)', () => {
        list.append('A');
        list.append('B');
        list.append('C');

        list.deleteAll('A');

        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('B');
        expect(list.get(1)).toBe('C');
        expect(list.head.value).toBe('B');
        expect(list.tail.value).toBe('C');
        expect(list.tail.next).toBe(list.head);
    });

    test('видалення єдиного елемента (в середині)', () => {
        list.append('A');
        list.append('B');
        list.append('C');

        list.deleteAll('B');

        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('A');
        expect(list.get(1)).toBe('C');
        expect(list.tail.next).toBe(list.head);
    });

    test('видалення єдиного елемента (в кінці)', () => {
        list.append('A');
        list.append('B');
        list.append('C');

        list.deleteAll('C');

        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('A');
        expect(list.get(1)).toBe('B');
        expect(list.tail.value).toBe('B');
        expect(list.tail.next).toBe(list.head);
    });

    test('видалення всіх елементів, якщо вони всі однакові (декілька)', () => {
        list.append('A');
        list.append('A');
        list.append('A');

        list.deleteAll('A');

        expect(list.getLength()).toBe(0);
        expect(list.head).toBeNull();
        expect(list.tail).toBeNull();
    });

    test('видалення всіх елементів, якщо він один і співпадає (два однакових елементи)', () => {
        list.append('A');

        list.deleteAll('A');

        expect(list.getLength()).toBe(0);
        expect(list.head).toBeNull();
        expect(list.tail).toBeNull();
    });
    
    test('видалення елемента з списку з одного елемента, який не співпадає', () => {
        list.append('B');

        list.deleteAll('A');

        expect(list.getLength()).toBe(1);
        expect(list.head.value).toBe('B');
    });


    test('видалення декількох однакових елементів, розташованих підряд (на початку)', () => {
        list.append('A');
        list.append('A');
        list.append('B');
        list.append('C');

        list.deleteAll('A');

        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('B');
        expect(list.get(1)).toBe('C');
    });

    test('видалення декількох однакових елементів, розташованих підряд (в середині)', () => {
        list.append('B');
        list.append('A');
        list.append('A');
        list.append('C');

        list.deleteAll('A');

        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('B');
        expect(list.get(1)).toBe('C');
    });

    test('видалення декількох однакових елементів, розташованих підряд (в кінці)', () => {
        list.append('B');
        list.append('C');
        list.append('A');
        list.append('A');

        list.deleteAll('A');

        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('B');
        expect(list.get(1)).toBe('C');
        expect(list.tail.value).toBe('C');
        expect(list.tail.next).toBe(list.head);
    });
    
    test('видалення декількох однакових елементів, розташованих не підряд', () => {
        list.append('A');
        list.append('B');
        list.append('A');
        list.append('C');
        list.append('A');

        list.deleteAll('A');

        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('B');
        expect(list.get(1)).toBe('C');
        expect(list.head.value).toBe('B');
        expect(list.tail.value).toBe('C');
        expect(list.tail.next).toBe(list.head);
    });

    test('видалення елементів, коли голова списку змінюється декілька разів', () => {
        list.append('A');
        list.append('A');
        list.append('B');
        list.append('A');

        list.deleteAll('A');

        expect(list.getLength()).toBe(1);
        expect(list.get(0)).toBe('B');
        expect(list.head.value).toBe('B');
        expect(list.tail.value).toBe('B');
        expect(list.tail.next).toBe(list.head);
    });

    test('видалення елементів так, що список стає порожнім', () => {
        list.append('A');
        list.append('B');
        list.append('A');

        list.deleteAll('A');
        list.deleteAll('B');

        expect(list.getLength()).toBe(0);
        expect(list.head).toBeNull();
        expect(list.tail).toBeNull();
    });

    test('складний випадок: A A B A A C A A', () => {
        list.append('A'); list.append('A'); list.append('B'); list.append('A');
        list.append('A'); list.append('C'); list.append('A'); list.append('A');
        
        list.deleteAll('A');
        
        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('B');
        expect(list.get(1)).toBe('C');
        expect(list.head.value).toBe('B');
        expect(list.tail.value).toBe('C');
        expect(list.tail.next).toBe(list.head);
    });

    test('випадок, де всі елементи, крім одного, видаляються', () => {
        list.append('X'); 
        list.append('X'); 
        list.append('Y'); 
        list.append('X'); 
        list.append('X');

        list.deleteAll('X');

        expect(list.getLength()).toBe(1);
        expect(list.get(0)).toBe('Y');
        expect(list.head.value).toBe('Y');
        expect(list.tail.value).toBe('Y');
    });
});

describe('clone method', () => {
    let list;

    beforeEach(() => {
        list = new CircularLinkedList();
    });

    test('клонування порожнього списку', () => {
        const clonedList = list.clone();

        expect(clonedList.getLength()).toBe(0);
        expect(clonedList.head).toBeNull();
        expect(clonedList.tail).toBeNull();
        expect(clonedList).not.toBe(list);
    });

    test('клонування списку з одним елементом', () => {
        list.append('A');

        const clonedList = list.clone();

        expect(clonedList.getLength()).toBe(1);
        expect(clonedList.get(0)).toBe('A');
        expect(clonedList.head.value).toBe('A');
        expect(clonedList.tail.value).toBe('A');
        expect(clonedList.head.next).toBe(clonedList.head);
        expect(clonedList).not.toBe(list);
        expect(clonedList.head).not.toBe(list.head);
    });

    test('клонування списку з декількома елементами', () => {
        list.append('A');
        list.append('B');
        list.append('C');

        const clonedList = list.clone();

        expect(clonedList.getLength()).toBe(3);
        expect(clonedList.get(0)).toBe('A');
        expect(clonedList.get(1)).toBe('B');
        expect(clonedList.get(2)).toBe('C');
        expect(clonedList.head.value).toBe('A');
        expect(clonedList.tail.value).toBe('C');
        expect(clonedList.tail.next).toBe(clonedList.head);
        expect(clonedList).not.toBe(list);
    });

    test('зміна оригіналу не впливає на клон', () => {
        list.append('A');
        list.append('B');
        const clonedList = list.clone();
        list.append('C');
        list.delete(0);
        
        expect(clonedList.getLength()).toBe(2);
        expect(clonedList.get(0)).toBe('A');
        expect(clonedList.get(1)).toBe('B');
        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('B');
    });

    test('зміна клона не впливає на оригінал', () => {
        list.append('A');
        list.append('B');
        const clonedList = list.clone();
        clonedList.append('X');
        clonedList.delete(0);
        
        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('A');
        expect(list.get(1)).toBe('B');

        expect(clonedList.getLength()).toBe(2);
        expect(clonedList.get(0)).toBe('B');
    });
});

describe('reverse method', () => {
    let list;

    beforeEach(() => {
        list = new CircularLinkedList();
    });

    test('реверс порожнього списку', () => {
        list.reverse();

        expect(list.getLength()).toBe(0);
        expect(list.head).toBeNull();
        expect(list.tail).toBeNull();
    });

    test('реверс списку з одним елементом', () => {
        list.append('A');

        list.reverse();

        expect(list.getLength()).toBe(1);
        expect(list.get(0)).toBe('A');
        expect(list.head.value).toBe('A');
        expect(list.tail.value).toBe('A');
        expect(list.tail.next).toBe(list.head);
    });

    test('реверс списку з двома елементами', () => {
        list.append('A');
        list.append('B');

        list.reverse();

        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('B');
        expect(list.get(1)).toBe('A');
        expect(list.head.value).toBe('B');
        expect(list.tail.value).toBe('A');
        expect(list.tail.next).toBe(list.head);
    });

    test('реверс списку з декількома елементами', () => {
        list.append('A');
        list.append('B');
        list.append('C');
        list.append('D');

        list.reverse();

        expect(list.getLength()).toBe(4);
        expect(list.get(0)).toBe('D');
        expect(list.get(1)).toBe('C');
        expect(list.get(2)).toBe('B');
        expect(list.get(3)).toBe('A');
        expect(list.head.value).toBe('D');
        expect(list.tail.value).toBe('A');
        expect(list.tail.next).toBe(list.head);
    });

    test('подвійний реверс повертає до початкового стану', () => {
        list.append('A');
        list.append('B');
        list.append('C');

        list.reverse();
        list.reverse();

        expect(list.getLength()).toBe(3);
        expect(list.get(0)).toBe('A');
        expect(list.get(1)).toBe('B');
        expect(list.get(2)).toBe('C');
    });
});

describe('findFirst method', () => {
    let list;

    beforeEach(() => {
        list = new CircularLinkedList();
    });

    test('пошук у порожньому списку', () => {
        expect(list.findFirst('A')).toBe(-1);
    });

    test('пошук елемента, якого немає в списку', () => {
        list.append('A');
        list.append('B');

        expect(list.findFirst('C')).toBe(-1);
    });

    test('пошук першого елемента, коли елемент один в списку', () => {
        list.append('A');

        expect(list.findFirst('A')).toBe(0);
    });

    test('пошук першого елемента, коли елементів декілька', () => {
        list.append('A');
        list.append('B');
        list.append('A');
        list.append('C');

        expect(list.findFirst('A')).toBe(0);
        expect(list.findFirst('B')).toBe(1);
        expect(list.findFirst('C')).toBe(3);
    });

    test('пошук з різними типами даних', () => {
        list.append(10);
        list.append('10');
        list.append(true);

        expect(list.findFirst(10)).toBe(0);
        expect(list.findFirst('10')).toBe(1);
        expect(list.findFirst(true)).toBe(2);
        expect(list.findFirst(false)).toBe(-1);
    });
});

describe('findLast method', () => {
    let list;

    beforeEach(() => {
        list = new CircularLinkedList();
    });

    test('пошук у порожньому списку', () => {
        expect(list.findLast('A')).toBe(-1);
    });

    test('пошук елемента, якого немає в списку', () => {
        list.append('A');
        list.append('B');

        expect(list.findLast('C')).toBe(-1);
    });

    test('пошук останнього входження, коли елемент один в списку', () => {
        list.append('A');

        expect(list.findLast('A')).toBe(0);
    });

    test('пошук останнього входження, коли елементів декілька', () => {
        list.append('A');
        list.append('B');
        list.append('A');
        list.append('C');
        list.append('A');

        expect(list.findLast('A')).toBe(4);
        expect(list.findLast('B')).toBe(1);
        expect(list.findLast('C')).toBe(3);
    });
    
    test('пошук останнього входження, коли елемент на початку', () => {
        list.append('A');
        list.append('B');
        list.append('C');

        expect(list.findLast('A')).toBe(0);
    });
});

describe('clear method', () => {
    let list;

    beforeEach(() => {
        list = new CircularLinkedList();
    });

    test('очищення порожнього списку', () => {
        list.clear();

        expect(list.getLength()).toBe(0);
        expect(list.head).toBeNull();
        expect(list.tail).toBeNull();
    });

    test('очищення списку з одним елементом', () => {
        list.append('A');

        list.clear();

        expect(list.getLength()).toBe(0);
        expect(list.head).toBeNull();
        expect(list.tail).toBeNull();
    });

    test('очищення списку з декількома елементами', () => {
        list.append('A');
        list.append('B');
        list.append('C');

        list.clear();

        expect(list.getLength()).toBe(0);
        expect(list.head).toBeNull();
        expect(list.tail).toBeNull();
    });

    test('після очищення можна знову додавати елементи', () => {
        list.append('A');
        list.clear();

        list.append('B');
        list.append('C');

        expect(list.getLength()).toBe(2);
        expect(list.get(0)).toBe('B');
        expect(list.get(1)).toBe('C');
    });
});

describe('extend method', () => {
    let list1;
    let list2;

    beforeEach(() => {
        list1 = new CircularLinkedList();
        list2 = new CircularLinkedList();
    });

    test('розширення порожнього списку іншим порожнім списком', () => {
        list1.extend(list2);

        expect(list1.getLength()).toBe(0);
        expect(list1.head).toBeNull();
    });

    test('розширення порожнього списку не порожнім списком', () => {
        list2.append('A');
        list2.append('B');

        list1.extend(list2);

        expect(list1.getLength()).toBe(2);
        expect(list1.get(0)).toBe('A');
        expect(list1.get(1)).toBe('B');
        expect(list1.tail.next).toBe(list1.head);
    });

    test('розширення не порожнього списку порожнім списком', () => {
        list1.append('X');
        list1.append('Y');

        list1.extend(list2);

        expect(list1.getLength()).toBe(2);
        expect(list1.get(0)).toBe('X');
        expect(list1.get(1)).toBe('Y');
    });

    test('розширення не порожнього списку іншим не порожнім списком', () => {
        list1.append('A');
        list1.append('B');
        list2.append('C');
        list2.append('D');

        list1.extend(list2);

        expect(list1.getLength()).toBe(4);
        expect(list1.get(0)).toBe('A');
        expect(list1.get(1)).toBe('B');
        expect(list1.get(2)).toBe('C');
        expect(list1.get(3)).toBe('D');
        expect(list1.head.value).toBe('A');
        expect(list1.tail.value).toBe('D');
        expect(list1.tail.next).toBe(list1.head);
    });

    test('оригінальний список не змінюється', () => {
        list1.append('A');
        list2.append('B');
        list2.append('C');
        const originalList2Length = list2.getLength();
        const originalList2HeadValue = list2.head.value;

        list1.extend(list2);
        
        expect(list2.getLength()).toBe(originalList2Length);
        expect(list2.head.value).toBe(originalList2HeadValue);
        expect(list2.get(0)).toBe('B');
        expect(list2.get(1)).toBe('C');
    });

    test("спроба розширення не об'єктом CircularLinkedList", () => {
        list1.append('A');
        list1.extend(null);
        expect(list1.getLength()).toBe(1);

        list1.extend({});
        expect(list1.getLength()).toBe(1);

        list1.extend([1,2,3]);
        expect(list1.getLength()).toBe(1);
    });
});
