import { Sentence } from './Sentence/Sentence'

export const SPACE =                    'SPACE'
export const TAB =                      'TAB'
export const NEW_LINE =                 'NEW_LINE'
export const EXIT_COMMAND =             '$EXIT$'
export const allowedCharacters =        { ' ': SPACE, '\t' : TAB, '\n' : NEW_LINE }
export type SentenceChar =              typeof SPACE
                                      | typeof TAB
                                      | typeof NEW_LINE

export enum OperationTypes {
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
    FLOW_CONTROL_EXIT =                 'FLOW_CONTROL_EXIT',
    HEAP_STORE =                        'HEAP_STORE',
    HEAP_PUSH =                         'HEAP_PUSH'
}

export enum DataTypes {
    NUMBER =                            'NUMBER',
    LABEL =                             'LABEL',
    INPUT_STREAM =                      'INPUT_STREAM'
}

export type OperationObject = {
    SPACE? :                            object,
    TAB? :                              object,
    NEW_LINE? :                         object,
    operation? :                        OperationTypes,
    argument? :                         DataTypes
}

export enum SentenceStates {
    READY =                             'READY',
    IN_PROGRESS =                       'IN_PROGRESS',
    WAITING_FOR_NUMBER =                'WAITING_FOR_NUMBER',
    WAITING_FOR_LABEL =                 'WAITING_FOR_LABEL',
    WAITING_FOR_INPUT_STREAM =          'WAITING_FOR_INPUT_STREAM'
}

export type SentenceIterator = {
    [Symbol.iterator](): {
        next():  {
            done: boolean,
            value: Sentence | undefined
        }
    }
}
