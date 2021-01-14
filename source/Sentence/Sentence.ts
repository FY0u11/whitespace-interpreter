import { OperationFactory } from '../Operations/OperationFactory'
import { SentenceStates, DataTypes, NEW_LINE, OperationObject, OperationTypes, SentenceChar, SPACE, TAB } from '../types'

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
        }
    },
    NEW_LINE: {

    }
}

export class Sentence {
    private sentenceCharsChain: OperationObject = operations
    private operationType: OperationTypes | null = null
    private state: SentenceStates = SentenceStates.IN_PROGRESS
    private sign: typeof SPACE | typeof TAB | null = null
    private number: string | number = '0'

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

    public getSentenceReadiness () {
        return this.state
    }

    public updateSentenceReadiness () {
        if (Object.keys(this.sentenceCharsChain).includes('operation')) {
            this.operationType = this.sentenceCharsChain.operation!
            this.state = this.sentenceCharsChain.argument
                ? this.sentenceCharsChain.argument === DataTypes.NUMBER
                    ? SentenceStates.WAITING_FOR_NUMBER
                    : SentenceStates.WAITING_FOR_LABEL
                : SentenceStates.READY
        }
    }

    public execute () {
        if (this.state === SentenceStates.READY) {
            const operationFactory = new OperationFactory()
            const operation = operationFactory.getOperation(this.operationType!)
            operation.run(this.sign === SPACE ? this.number : -this.number)
        }
    }

    feedLabel (sentenceChar: SentenceChar) {
        // TODO
    }
}
