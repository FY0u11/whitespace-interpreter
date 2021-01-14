import { Push } from './Stack/Push'
import { IOperation } from './IOperation'
import { Swap } from './Stack/Swap'
import { DiscardOne } from './Stack/DiscardOne'
import { DiscardMany } from './Stack/DiscardMany'
import { DuplicateOne } from './Stack/DuplicateOne'
import { DuplicateNth } from './Stack/DuplicateNth'
import { OperationTypes } from '../types'
import { Sum } from './Arithmetics/Sum'
import { Subtract } from './Arithmetics/Subtract'
import { Mul } from './Arithmetics/Mul'
import { Div } from './Arithmetics/Div'
import { Mod } from './Arithmetics/Mod'
import { OutputNumber } from './InputOutput/OutputNumber'
import { Exit } from './FlowControl/Exit'

export class OperationFactory {
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
           case OperationTypes.FLOW_CONTROL_EXIT: return new Exit()
           default: throw new Error('Not implemented yet ' + type)
       }
    }
}
