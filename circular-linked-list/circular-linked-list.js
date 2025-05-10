class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class CircularLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    getLength() {
        return this.length;
    }

    append(value) {
        const node = new Node(value);

        if (this.length === 0){
            this.head = node;
            this.tail = node;
            node.next = node;
        } else {
            this.tail.next = node;
            node.next = this.head;
            this.tail = node;
        }
        this.length++;
    }

    insert(value, index) {
        if(!Number.isInteger(index) || index > this.length || index < 0){
            return 'Incorrect index of the element'
        }

        if (index === this.length) {
            this.append(value);
            return;
        }

        const node = new Node(value);

        if (index === 0) {
            node.next = this.head;
            this.head = node;
            this.tail.next = this.head;
        } else {
            let current = this.head;
            let prev = null;

            for (let i = 0; i < index; i++) {
                prev = current;
                current = current.next;
            }
            prev.next = node;
            node.next = current;
        }
        this.length++;
    }

    delete(index) {
        if(!Number.isInteger(index) || index >= this.length || index < 0){
            return 'Incorrect index of the element'
        }

        let deletedElement;

        if(this.length === 1) {
            deletedElement = this.head;
            this.head = null;
            this.tail = null;
        } else if (index === 0) {
            deletedElement = this.head;
            this.head = this.head.next;
            this.tail.next = this.head;
        } else {
            let current = this.head;
            let prev = null;

            for (let i = 0; i < index; i++) {
            prev = current;
            current = current.next;
            }

            deletedElement = current;
            prev.next = current.next;

            if(index === this.length - 1) {
                this.tail = prev;
            }
        }
        this.length--;
        return deletedElement;
    }

    deleteAll(element) {
        if (!this.head) return;

        while (this.head && this.head.value === element) {
            if (this.length === 1) {
                this.head = null;
                this.tail = null;
                this.length = 0;
                return;
            }
            this.head = this.head.next;
            this.tail.next = this.head;
            this.length--;
        }

        if(!this.head) return;

        let current = this.head;
        while (current != this.head) {
            if (current.next.value === value) {
                if (current.next === this.tail) {
                    this.tail = current;
                }
                current.next = current.next.next;
                this.length--;
            } else {
                current = current.next;
            }
        }

        if(this.tail) {
            this.tail.next = this.head;
        } else this.head = null;
    }

    get(index) {
        if(!Number.isInteger(index) || index >= this.length || index < 0){
            return 'Incorrect index of the element'
        }

        let current = this.head;

        for(let i = 0; i < index; i++) {
            current = current.next;
        }

        return current.value;
    }

    clone() {
        const clonedList = new CircularLinkedList();
        if(!this.head) return clonedList;

        let current = this.head;

        for(let i = 0; i < this.length; i++) {
            clonedList.append(current.value);
            current = current.next;
        }
        
        return clonedList;
    }

    reverse() {
        if (this.length <= 1) return;

        let prev = null;
        let current = this.head;
        let nextNode = null;

        const originalHead = this.head;
        const originalTail = this.tail;

        for (let i = 0; i < this.length; i++) {
            nextNode = current.next;
            current.next = prev;

            prev = current;
            current = nextNode;
        }

        this.head = originalTail;
        this.tail = originalHead;

        this.tail.next = this.head;
    }

    findFirst(element) {
        if(!this.head) return -1;
        let current = this.head;

        for(let i = 0; i < this.length; i++) {
            if(current.value === element) return i;
            current = current.next;
        }
        return -1;
    }

    findLast(element) {
        if(!this.head) return -1;
        let current = this.head;
        let lastIndex = -1;

        for (let i = 0; i < this.length; i++) {
            if(current.value === element) lastIndex = i;
            current = current.next;
        }
        return lastIndex;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    extend(list) {
        if (!(list instanceof CircularLinkedList) || !list.head) return;
        let current = list.head;
        for (let i = 0; i < list.length; i++) {
            this.append(current.value);
            current = current.next;
        }
    }
}

module.exports = CircularLinkedList;