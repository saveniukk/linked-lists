function createSimulatedNode(value, listIdSymbol) {
    const node = { 
        value: value,
        listId: listIdSymbol
    };
    node.next = node;
    return node;
}

class CircularLinkedList {
    constructor() {
        this.items = [];
        this.uniqueInstanceSymbol = Symbol("listInstance");
    }

    get head() {
        if (this.items.length === 0) {
            return null;
        }
        if (this.items.length === 1) {
            return createSimulatedNode(this.items[0], this.uniqueInstanceSymbol);
        }

        return {
            value: this.items[0],
            listId: this.uniqueInstanceSymbol, 
            next: { 
                value: this.items[1],
                listId: this.uniqueInstanceSymbol
            }
        };
    }

    get tail() {
        if (this.items.length === 0) {
            return null;
        }
        const tailValue = this.items[this.items.length - 1];
        if (this.items.length === 1) {
            return {
                value: tailValue,
                listId: this.uniqueInstanceSymbol,
                next: createSimulatedNode(this.items[0], this.uniqueInstanceSymbol)
            };
        }

        const headSimulationForTailNext = {
            value: this.items[0],
            listId: this.uniqueInstanceSymbol,
            next: {
                value: this.items[1],
                listId: this.uniqueInstanceSymbol
            }
        };
        return {
            value: tailValue,
            listId: this.uniqueInstanceSymbol,
            next: headSimulationForTailNext
        };
    }

    getLength() {
        return this.items.length;
    }

    append(value) {
        this.items.push(value);
    }

    insert(value, index) {
        if (!Number.isInteger(index) || index > this.items.length || index < 0) {
            return 'Incorrect index of the element';
        }
        this.items.splice(index, 0, value);
    }

    delete(index) {
        if (!Number.isInteger(index) || index >= this.items.length || index < 0) {
            return 'Incorrect index of the element';
        }
        return this.items.splice(index, 1)[0];
    }

    deleteAll(element) {
        this.items = this.items.filter(item => item !== element);
    }

    get(index) {
        if (!Number.isInteger(index) || index >= this.items.length || index < 0) {
            return 'Incorrect index of the element';
        }
        return this.items[index];
    }

    clone() {
        const cloned = new CircularLinkedList();
        cloned.items = [this.items];
        return cloned;
    }

    reverse() {
        this.items.reverse();
    }

    findFirst(element) {
        return this.items.indexOf(element);
    }

    findLast(element) {
        return this.items.lastIndexOf(element);
    }

    clear() {
        this.items = [];
    }

    extend(list) {
        if (list && list.items && Array.isArray(list.items)) {
            this.items.push(list.items);
        }
    }
}

module.exports = CircularLinkedList;