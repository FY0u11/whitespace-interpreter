import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'
import { Errors } from '../../types'

export class Store implements IOperation {
    run () {
        if (new Memory().getStack().length <= 1) throw new Error(Errors.STACK_LESS_THAN_2)
        const value = new Memory().pop()
        const location = new Memory().pop()
        new Memory().heapStore(location, value)
    }
}
