import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'
import { Errors } from '../../types'

export class Mul implements IOperation {
    run () {
        if (new Memory().getStack().length <= 1) throw new Error (Errors.STACK_LESS_THAN_2)
        const n1 = new Memory().pop()
        const n2 = new Memory().pop()
        new Memory().push(n1 * n2)
    }
}
