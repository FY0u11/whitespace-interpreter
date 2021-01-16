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
import { Store } from './HeapAccess/Store'
import { HeapPushInStack } from './HeapAccess/HeapPushInStack'
import { OutputCharacter } from './InputOutput/OutputCharacter'
import { ReadNumber } from './InputOutput/ReadNumber'
import { ReadCharacter } from './InputOutput/ReadCharacter'
import { JumpZero } from './FlowControl/JumpZero'
import { JumpLess } from './FlowControl/JumpLess'
import { Jump } from './FlowControl/Jump'

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
