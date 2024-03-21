export class Stack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined{
        return this.items.pop();
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    clear(): void {
        while(!this.isEmpty()) {
            this.pop()
        }
    }
}