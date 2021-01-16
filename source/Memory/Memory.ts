import { IMemory } from './IMemory'
import { Errors } from '../types'

export class Memory implements IMemory {
    private static instance: Memory
    private stack: number[] = []
    private heap: number[] = []
    private marks: Map<string, number> = new Map()
    private subRoutineCallPosition: number[] = []

    constructor () {
        if (Memory.instance) {
            return Memory.instance
        }

        Memory.instance = this
    }

    heapGet (location: number): number | undefined {
        return this.heap[location]
    }

    heapStore (location: number, value: number) {
        this.heap[location] = value
    }

    push (number: number) {
        this.stack.push(number)
    }

    pop (): number {
        if (!this.stack.length) throw new Error(Errors.STACK_IS_EMPTY)
        return this.stack.pop()!
    }

    swap () {
        if (this.stack.length <= 1) throw new Error(Errors.STACK_LESS_THAN_2)
        const length = this.stack.length
        let tmp = this.stack[length - 1]
        this.stack[length - 1] = this.stack[length - 2]
        this.stack[length - 2] = tmp
    }

    discard (): void
    discard (n: number): void
    discard (n?: number): void {
        if (!this.stack.length) throw new Error(Errors.STACK_IS_EMPTY)
        if (!n) {
            this.stack.pop()
        } else {
            const lastValue = this.stack[this.stack.length - 1]
            if (n < 0 || n >= this.stack.length) {
                this.stack = [lastValue]
            } else {
                this.stack = this.stack.slice(0, this.stack.length - 1 - n)
                this.stack.push(lastValue)
            }
        }
    }

    duplicate (): void
    duplicate (n: number): void
    duplicate (n?: number): void {
        if (!this.stack.length) throw new Error(Errors.STACK_IS_EMPTY)
        if (this.stack.length) {
            if (!n) {
                this.stack.push(this.stack[this.stack.length - 1])
            } else {
                if (this.stack[this.stack.length - n - 1]) {
                    this.stack.push(this.stack[this.stack.length - n - 1])
                } else throw new Error(Errors.OUT_OF_BOUNDARY_INDEX)
            }
        }
    }

    saveMark (mark: string, position: string) {
        if (this.marks.has(mark)) throw new Error(Errors.MARKS_REPEAT)
        this.marks.set(mark, Number.parseInt(position))
    }

    getPosition (mark: string): number {
        if (!this.marks.get(mark)) throw new Error(Errors.NO_SUCH_MARK)
        return this.marks.get(mark)!
    }

    getStack () {
        return [...this.stack]
    }

    getHeap () {
        return [...this.heap]
    }

    reset () {
        this.stack = []
        this.heap = []
        this.marks = new Map()
        this.subRoutineCallPosition = []
    }

    subRoutinePush (position: number) {
        this.subRoutineCallPosition.push(position)
    }

    subRoutinePop (): number {
        return this.subRoutineCallPosition.pop()!
    }
}
