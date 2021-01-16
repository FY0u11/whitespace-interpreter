const SPACE =                    'SPACE'
const TAB =                      'TAB'
const NEW_LINE =                 'NEW_LINE'
const EXIT_COMMAND =             '$EXIT$'
const JUMP_COMMAND =             '$JUMP$:'
const allowedCharacters =        { ' ': SPACE, '\t' : TAB, '\n' : NEW_LINE }
type SentenceChar =              typeof SPACE
    | typeof TAB
    | typeof NEW_LINE

enum OperationTypes {
    STACK_PUSH =                        'STACK_PUSH',
    STACK_DUPLICATE_ONE =               'STACK_DUPLICATE_ONE',
    STACK_DUPLICATE_NTH =               'STACK_DUPLICATE_NTH',
    STACK_DISCARD_ONE =                 'STACK_DISCARD_ONE',
    STACK_DISCARD_MANY =                'STACK_DISCARD_MANY',
    STACK_SWAP =                        'STACK_SWAP',
    ARITHMETICS_SUM =                   'ARITHMETICS_SUM',
    ARITHMETICS_SUBTRACT =              'ARITHMETICS_SUBTRACT',
    ARITHMETICS_MUL =                   'ARITHMETICS_MUL',
    ARITHMETICS_DIV =                   'ARITHMETICS_DIV',
    ARITHMETICS_MOD =                   'ARITHMETICS_MOD',
    IO_OUTPUT_NUMBER =                  'IO_OUTPUT_NUMBER',
    IO_OUTPUT_CHARACTER =               'IO_OUTPUT_CHARACTER',
    IO_READ_NUMBER =                    'IO_READ_NUMBER',
    IO_READ_CHARACTER =                 'IO_READ_CHARACTER',
    FLOW_CONTROL_MARK =                 'FLOW_CONTROL_MARK',
    FLOW_CONTROL_JUMP_ZERO =            'FLOW_CONTROL_JUMP_ZERO',
    FLOW_CONTROL_JUMP_LESS =            'FLOW_CONTROL_JUMP_LESS',
    FLOW_CONTROL_JUMP =                 'FLOW_CONTROL_JUMP',
    FLOW_CONTROL_EXIT =                 'FLOW_CONTROL_EXIT',
    HEAP_STORE =                        'HEAP_STORE',
    HEAP_PUSH =                         'HEAP_PUSH'
}

enum DataTypes {
    NUMBER =                            'NUMBER',
    LABEL =                             'LABEL',
    INPUT_STREAM =                      'INPUT_STREAM'
}

type OperationObject = {
    SPACE? :                            object,
    TAB? :                              object,
    NEW_LINE? :                         object,
    operation? :                        OperationTypes,
    argument? :                         DataTypes
}

enum SentenceStates {
    READY =                             'READY',
    IN_PROGRESS =                       'IN_PROGRESS',
    WAITING_FOR_NUMBER =                'WAITING_FOR_NUMBER',
    WAITING_FOR_LABEL =                 'WAITING_FOR_LABEL',
    WAITING_FOR_INPUT_STREAM =          'WAITING_FOR_INPUT_STREAM'
}

type SentenceIterator = {
    [Symbol.iterator](): {
        next():  {
            done: boolean,
            value: Sentence | undefined
        }
    }
}

enum Errors {
    STACK_IS_EMPTY = 'Stack is empty. Cannot perform requested operation',
    STACK_LESS_THAN_2 = 'Stack has less than 2 values. Cannot perform requested operation',
    DIVISION_BY_ZERO = 'Can not perform division by 0',
    OUT_OF_BOUNDARY_INDEX = 'Out of boundary index',
    NO_SUCH_MARK = 'No such mark',
    MARKS_REPEAT = 'Marks repeat',
    UNCLEAN_TERMINATION = 'Program wasn\'t correctly terminated'
}

class Utils {
    static getRandomInt (min: number, max: number): number {
        return ~~(Math.random() * (max - min) + min)
    }

    static encodeNumber (number: number): string {
        let encodedNumber = number.toString(2)
            .replace(/1/g, '\t')
            .replace(/0/g, ' ')
            .replace('-', '\t')
        return number > 0 ? ' ' + encodedNumber : encodedNumber
    }

    static getSourceCodeForPushingNNumbersIntoTheStack (...args: number[]): string {
        if (args.length) {
            return args.reduce((sourceCode, arg) => sourceCode + `  ${Utils.encodeNumber(arg)}\n`, '')
        } else return '   \n   \t\n'
    }

    static mod (n1: number, n2: number): number {
        return ((n1 % n2) + n2) % n2;
    }
}


interface IMemory {
    push (number: number): void
}

class Memory implements IMemory {
    private static instance: Memory
    private stack: number[] = []
    private heap: number[] = []
    private marks: Map<string, number> = new Map()

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
    }
}

interface IOperation {
    run (arg?: string | number, inputStream?: string | null): void | string
}

class Div implements IOperation {
    run () {
        if (new Memory().getStack().length <= 1) throw new Error (Errors.STACK_LESS_THAN_2)
        const n1 = new Memory().pop()
        const n2 = new Memory().pop()
        if (n1 === 0 || n1 === -0) throw new Error(Errors.DIVISION_BY_ZERO)
        else new Memory().push(Math.floor(n2 / n1))
    }
}

class Mod implements IOperation {
    run () {
        if (new Memory().getStack().length <= 1) throw new Error (Errors.STACK_LESS_THAN_2)
        const n1 = new Memory().pop()
        const n2 = new Memory().pop()
        if (n1 === 0 || n1 === -0) throw new Error(Errors.DIVISION_BY_ZERO)
        else new Memory().push(Utils.mod(n2, n1))
    }
}

class Mul implements IOperation {
    run () {
        if (new Memory().getStack().length <= 1) throw new Error (Errors.STACK_LESS_THAN_2)
        const n1 = new Memory().pop()
        const n2 = new Memory().pop()
        new Memory().push(n1 * n2)
    }
}

class Subtract implements IOperation {
    run () {
        if (new Memory().getStack().length <= 1) throw new Error (Errors.STACK_LESS_THAN_2)
        const n1 = new Memory().pop()
        const n2 = new Memory().pop()
        new Memory().push(n2 - n1)
    }
}

class Sum implements IOperation {
    run () {
        if (new Memory().getStack().length <= 1) throw new Error (Errors.STACK_LESS_THAN_2)
        const n1 = new Memory().pop()
        const n2 = new Memory().pop()
        new Memory().push(n1 + n2)
    }
}

class Exit implements IOperation {
    run (): string {
        new Memory().reset()
        return EXIT_COMMAND
    }
}

class Jump implements IOperation {
    run (arg: string): string | void {
        const [mark,] = arg.split(':')
        return JUMP_COMMAND + new Memory().getPosition(mark).toString()
    }
}

class JumpLess implements IOperation {
    run (arg: string): string | void {
        const condition = new Memory().pop()
        if (condition < 0) {
            const [mark,] = arg.split(':')
            return JUMP_COMMAND + new Memory().getPosition(mark).toString()
        }
    }
}

class JumpZero implements IOperation {
    run (arg: string): string | void {
        const condition = new Memory().pop()
        if (!condition) {
            const [mark,] = arg.split(':')
            return JUMP_COMMAND + new Memory().getPosition(mark).toString()
        }
    }
}

class HeapPushInStack implements IOperation {
    run () {
        const location = new Memory().pop()
        const valueToPush = new Memory().heapGet(location)
        if (valueToPush !== undefined) {
            new Memory().push(valueToPush)
        }
    }
}

class Store implements IOperation {
    run () {
        if (new Memory().getStack().length <= 1) throw new Error(Errors.STACK_LESS_THAN_2)
        const value = new Memory().pop()
        const location = new Memory().pop()
        new Memory().heapStore(location, value)
    }
}

class OutputCharacter implements IOperation {
    run (): string {
        const charCode = new Memory().pop()
        return String.fromCharCode(charCode)
    }
}

class OutputNumber implements IOperation {
    run (): string {
        const number = new Memory().pop()
        return number.toString(10)
    }
}

class ReadCharacter implements IOperation {
    run (_: string, inputStream: string): void {
        const location = new Memory().pop()
        new Memory().heapStore(location, inputStream.charCodeAt(0))
    }
}

class ReadNumber implements IOperation {
    run (_: string, inputStream: string): void {
        const location = new Memory().pop()
        if (!Number.isNaN(Number.parseInt(inputStream))) {
            new Memory().heapStore(location, Number.parseInt(inputStream))
        }
    }
}

class DiscardMany implements IOperation {
    run (arg: number) {
        new Memory().discard(arg)
    }
}

class DiscardOne implements IOperation {
    run () {
        new Memory().discard()
    }
}

class DuplicateNth implements IOperation {
    run (arg: number) {
        new Memory().duplicate(arg)
    }
}

class DuplicateOne implements IOperation {
    run () {
        new Memory().duplicate()
    }
}

class Push implements IOperation {
    run (number: number) {
        new Memory().push(number)
    }
}

class Swap implements IOperation {
    run () {
        new Memory().swap()
    }
}

class OperationFactory {
    getOperation (type: OperationTypes): IOperation {
        switch (type) {
            case OperationTypes.STACK_PUSH: return new Push()
            case OperationTypes.STACK_SWAP: return new Swap()
            case OperationTypes.STACK_DISCARD_ONE: return new DiscardOne()
            case OperationTypes.STACK_DISCARD_MANY: return new DiscardMany()
            case OperationTypes.STACK_DUPLICATE_ONE: return new DuplicateOne()
            case OperationTypes.STACK_DUPLICATE_NTH: return new DuplicateNth()
            case OperationTypes.ARITHMETICS_SUM: return new Sum()
            case OperationTypes.ARITHMETICS_SUBTRACT: return new Subtract()
            case OperationTypes.ARITHMETICS_MUL: return new Mul()
            case OperationTypes.ARITHMETICS_DIV: return new Div()
            case OperationTypes.ARITHMETICS_MOD: return new Mod()
            case OperationTypes.IO_OUTPUT_NUMBER: return new OutputNumber()
            case OperationTypes.IO_OUTPUT_CHARACTER: return new OutputCharacter()
            case OperationTypes.IO_READ_NUMBER: return new ReadNumber()
            case OperationTypes.IO_READ_CHARACTER: return new ReadCharacter()
            case OperationTypes.FLOW_CONTROL_EXIT: return new Exit()
            case OperationTypes.HEAP_PUSH: return new HeapPushInStack()
            case OperationTypes.HEAP_STORE: return new Store()
            case OperationTypes.FLOW_CONTROL_JUMP_ZERO: return new JumpZero()
            case OperationTypes.FLOW_CONTROL_JUMP_LESS: return new JumpLess()
            case OperationTypes.FLOW_CONTROL_JUMP: return new Jump()
            default: throw new Error('Not implemented yet ' + type)
        }
    }
}

const operations = {
    SPACE: {
        SPACE: {
            operation: OperationTypes.STACK_PUSH,
            argument: DataTypes.NUMBER
        },
        TAB: {
            SPACE: {
                operation: OperationTypes.STACK_DUPLICATE_NTH,
                argument: DataTypes.NUMBER
            },
            NEW_LINE: {
                operation: OperationTypes.STACK_DISCARD_MANY,
                argument: DataTypes.NUMBER
            }
        },
        NEW_LINE: {
            SPACE: {
                operation: OperationTypes.STACK_DUPLICATE_ONE
            },
            TAB: {
                operation: OperationTypes.STACK_SWAP
            },
            NEW_LINE: {
                operation: OperationTypes.STACK_DISCARD_ONE
            }
        }
    },
    TAB: {
        SPACE: {
            SPACE: {
                SPACE: {
                    operation: OperationTypes.ARITHMETICS_SUM
                },
                TAB: {
                    operation: OperationTypes.ARITHMETICS_SUBTRACT
                },
                NEW_LINE: {
                    operation: OperationTypes.ARITHMETICS_MUL
                }
            },
            TAB: {
                SPACE: {
                    operation: OperationTypes.ARITHMETICS_DIV
                },
                TAB: {
                    operation: OperationTypes.ARITHMETICS_MOD
                }
            }
        },
        NEW_LINE: {
            SPACE: {
                TAB: {
                    operation: OperationTypes.IO_OUTPUT_NUMBER
                },
                SPACE: {
                    operation: OperationTypes.IO_OUTPUT_CHARACTER
                }
            },
            TAB: {
                TAB: {
                    operation: OperationTypes.IO_READ_NUMBER,
                    argument: DataTypes.INPUT_STREAM
                },
                SPACE: {
                    operation: OperationTypes.IO_READ_CHARACTER,
                    argument: DataTypes.INPUT_STREAM
                }
            }
        },
        TAB: {
            SPACE: {
                operation: OperationTypes.HEAP_STORE
            },
            TAB: {
                operation: OperationTypes.HEAP_PUSH
            }
        }
    },
    NEW_LINE: {
        NEW_LINE: {
            NEW_LINE: {
                operation: OperationTypes.FLOW_CONTROL_EXIT
            }
        },
        SPACE: {
            SPACE: {
                operation: OperationTypes.FLOW_CONTROL_MARK,
                argument: DataTypes.LABEL
            },
            NEW_LINE: {
                operation: OperationTypes.FLOW_CONTROL_JUMP,
                argument: DataTypes.LABEL
            }
        },
        TAB: {
            SPACE: {
                operation: OperationTypes.FLOW_CONTROL_JUMP_ZERO,
                argument: DataTypes.LABEL
            },
            TAB: {
                operation: OperationTypes.FLOW_CONTROL_JUMP_LESS,
                argument: DataTypes.LABEL
            }
        }
    }
}

class Sentence {
    private sentenceCharsChain: OperationObject = operations
    private _operationType: OperationTypes | null = null
    private state: SentenceStates = SentenceStates.IN_PROGRESS
    private sign: typeof SPACE | typeof TAB | null = null
    private number: string | number = '0'
    private _label: string = ''
    private inputStream: string | undefined = undefined

    constructor (private readonly _startPosition: number) {}

    public feed (sentenceChar: SentenceChar) {
        if (this.sentenceCharsChain[sentenceChar] !== undefined) {
            this.sentenceCharsChain = this.sentenceCharsChain[sentenceChar] as OperationObject
        } else throw new Error ('Cannot parse source code')
        this.updateSentenceReadiness()
    }

    public feedNumber (sentenceChar: SentenceChar) {
        if (!this.sign) {
            if (sentenceChar === NEW_LINE) throw new Error ('Cannot parse number code')
            this.sign = sentenceChar
        } else {
            if (sentenceChar === NEW_LINE) {
                this.state = SentenceStates.READY
                this.number = Number.parseInt(this.number as string, 2)
            }
            else {
                this.number += sentenceChar === SPACE ? '0' : '1'
            }
        }
    }

    feedInputStream (inputStream: string) {
        this.inputStream = inputStream
        this.state = SentenceStates.READY
    }

    public getSentenceReadiness () {
        return this.state
    }

    public updateSentenceReadiness () {
        if (Object.keys(this.sentenceCharsChain).includes('operation')) {
            this._operationType = this.sentenceCharsChain.operation!
            switch (this.sentenceCharsChain.argument) {
                case DataTypes.INPUT_STREAM: this.state = SentenceStates.WAITING_FOR_INPUT_STREAM; break
                case DataTypes.NUMBER: this.state = SentenceStates.WAITING_FOR_NUMBER; break
                case DataTypes.LABEL: this.state = SentenceStates.WAITING_FOR_LABEL; break
                default: this.state = SentenceStates.READY
            }
        }
    }

    public execute (): void | string {
        if (this.state === SentenceStates.READY) {
            const operationFactory = new OperationFactory()
            const operation = operationFactory.getOperation(this.operationType!)
            if (this.label) {
                return operation.run(this.label)
            } else {
                return operation.run(this.sign === SPACE ? this.number : -this.number, this.inputStream !== undefined ? this.inputStream : null)
            }
        }
    }

    feedLabel (sentenceChar: SentenceChar, position: number) {
        if (sentenceChar === NEW_LINE) {
            this.state = SentenceStates.READY
            this._label += '\n:' + position.toString(10)
        } else {
            this._label += sentenceChar === SPACE ? ' ' : '\t'
        }
    }

    get operationType (): OperationTypes | null {
        return this._operationType
    }

    get label (): string {
        return this._label
    }

    get startPosition (): number {
        return this._startPosition
    }
}

class SentencesBuilder {
    private inputTimes: number = 0
    private readonly inputStream: string[] = []
    private sourceCode: string
    private _sourceCodePointer: number = 0

    constructor (sourceCode: string, inputStreamString: string = '') {
        this.sourceCode = sourceCode
        if (inputStreamString.includes('\n'))
            this.inputStream = inputStreamString.split('\n')
        else {
            let tmp = []
            for (let char of inputStreamString) tmp.push(char)
            this.inputStream = tmp
        }
    }

    private static parseChar (char: string): SentenceChar | null {
        return char in allowedCharacters ? allowedCharacters[char as ' ' | '\t' | '\n'] as SentenceChar : null
    }

    public buildSentences (): SentenceIterator {
        const that = this
        return {
            [Symbol.iterator]() {
                return {
                    next () {
                        const sentence = new Sentence(that._sourceCodePointer)
                        let done = false
                        while (sentence.getSentenceReadiness() !== SentenceStates.READY) {
                            if (sentence.getSentenceReadiness() === SentenceStates.IN_PROGRESS ||
                                sentence.getSentenceReadiness() === SentenceStates.WAITING_FOR_LABEL ||
                                sentence.getSentenceReadiness() === SentenceStates.WAITING_FOR_NUMBER) {
                                if (that.sourceCode.length === that._sourceCodePointer) {
                                    done = true
                                    break
                                }
                                const currentChar = SentencesBuilder.parseChar(that.sourceCode[that._sourceCodePointer++])
                                if (currentChar) {
                                    switch (sentence.getSentenceReadiness()) {
                                        case SentenceStates.IN_PROGRESS: sentence.feed(currentChar); break
                                        case SentenceStates.WAITING_FOR_LABEL: sentence.feedLabel(currentChar, that._sourceCodePointer); break
                                        case SentenceStates.WAITING_FOR_NUMBER: sentence.feedNumber(currentChar); break
                                    }
                                }
                            } else if (sentence.getSentenceReadiness() === SentenceStates.WAITING_FOR_INPUT_STREAM) {
                                sentence.feedInputStream(that.inputStream[that.inputTimes++])
                            }
                        }
                        return done ? {
                            value: undefined,
                            done: true
                        } : {
                            value: sentence,
                            done: false
                        }
                    }
                }
            }
        }
    }

    findMarks () {
        const sB = new SentencesBuilder(this.sourceCode)
        let acc = 0
        for (let sentence of sB.buildSentences()) {
            if (sentence && sentence.operationType === OperationTypes.FLOW_CONTROL_MARK) {
                const [mark, position] = sentence.label.split(':')
                const diff = Number.parseInt(position) - sentence.startPosition
                const newPosition = (Number.parseInt(position) - diff - acc).toString()
                this.sourceCode = this.sourceCode.substring(0, sentence.startPosition - acc) + this.sourceCode.substring(Number.parseInt(position) - acc, this.sourceCode.length)
                new Memory().saveMark(mark, newPosition)
                acc += diff
            }
        }
    }

    set sourceCodePointer (value: number) {
        this._sourceCodePointer = value
    }
}

class Whitespace {
    private readonly sourceCode: string
    private readonly inputStream: string
    private output: string = ''

    constructor (sourceCode: string, inputStream: string = '') {
        this.sourceCode = sourceCode
        this.inputStream = inputStream
    }

    readSourceCode (): string | void {
        const sB = new SentencesBuilder(this.sourceCode, this.inputStream)
        sB.findMarks()
        for (let sentence of sB.buildSentences()) {
            try {
                if (sentence) {
                    const result = sentence.execute()
                    if (result) {
                        if (result === '$EXIT$') {
                            return this.output
                        } else if (/\$JUMP\$/.test(result)) {
                            const [, position] = result.split(':')
                            sB.sourceCodePointer = Number.parseInt(position)
                        } else {
                            this.output += result
                        }
                    }
                }
            } catch (e) {
                throw new Error(e.message)
            }
        }
        throw new Error(Errors.UNCLEAN_TERMINATION)
    }
}

export function whitespace (sourceCode: string, inputStream: string = ''): string | void {
    console.log(sourceCode.replace(/ /g, 's')
        .replace(/\t/g, 't')
        .replace(/\n/g, 'n'))
    new Memory().reset()
    if (!sourceCode) throw new Error('Source code cannot be empty')
    const ws = new Whitespace(sourceCode, inputStream)
    return ws.readSourceCode()
}
