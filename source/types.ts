export const SPACE =                    'SPACE'
export const TAB =                      'TAB'
export const NEW_LINE =                 'NEW_LINE'
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
    ARITHMETICS_MODULE =                'ARITHMETICS_MODULE'
}

export enum DataTypes {
    NUMBER =                            'NUMBER',
    LABEL =                             'LABEL'
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
    WAITING_FOR_LABEL =                 'WAITING_FOR_LABEL'
}
