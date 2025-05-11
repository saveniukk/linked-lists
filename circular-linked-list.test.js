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
})