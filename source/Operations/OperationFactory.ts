import { Push } from './Stack/Push'
import { IOperation } from './IOperation'
import { Swap } from './Stack/Swap'
import { DiscardOne } from './Stack/DiscardOne'
import { DiscardMany } from './Stack/DiscardMany'
import { DuplicateOne } from './Stack/DuplicateOne'
import { DuplicateNth } from './Stack/DuplicateNth'
import { OperationTypes } from '../types'

export class OperationFactory {
    getOperation (type: OperationTypes): IOperation {
       switch (type) {
           case OperationTypes.STACK_PUSH: return new Push()
           case OperationTypes.STACK_SWAP: return new Swap()
           case OperationTypes.STACK_DISCARD_ONE: return new DiscardOne()
           case OperationTypes.STACK_DISCARD_MANY: return new DiscardMany()
           case OperationTypes.STACK_DUPLICATE_ONE: return new DuplicateOne()
           case OperationTypes.STACK_DUPLICATE_NTH: return new DuplicateNth()
           default: throw new Error('Not implemented yet ' + type)
       }
    }
}
