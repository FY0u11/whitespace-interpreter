import { OperationFactory } from '../Operations/OperationFactory'
import {
    DataTypes,
    NEW_LINE,
    OperationObject,
    OperationTypes,
    SentenceChar,
    SentenceStates,
    SPACE,
    TAB
} from '../types'

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
        }
    }
}

export class Sentence {
    private sentenceCharsChain: OperationObject = operations
    private operationType: OperationTypes | null = null
    private state: SentenceStates = SentenceStates.IN_PROGRESS
    private sign: typeof SPACE | typeof TAB | null = null
    private number: string | number = '0'
    private inputStream: string | undefined = undefined

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
            this.operationType = this.sentenceCharsChain.operation!
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
            return operation.run(this.sign === SPACE ? this.number : -this.number, this.inputStream !== undefined ? this.inputStream : null)
        }
    }

    feedLabel (sentenceChar: SentenceChar) {
        // TODO
    }
}
