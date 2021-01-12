import { IStack } from './IStack'

export class Stack implements IStack {
    private static instance: Stack
    private readonly stack: number[] = []

    constructor () {
        if (Stack.instance) {
            return Stack.instance
        }

        Stack.instance = this
    }

    push (number: number) {
        this.stack.push(number)
    }

    swap () {
        if (this.stack.length >= 2) {
            const length = this.stack.length
            let tmp = this.stack[length - 1]
            this.stack[length - 1] = this.stack[length - 2]
            this.stack[length - 2] = tmp
        }
    }

    discardOne () {
        this.stack.pop()
    }

    getStack () {
        return this.stack
    }
}
