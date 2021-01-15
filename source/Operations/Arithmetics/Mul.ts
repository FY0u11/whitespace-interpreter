import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class Mul implements IOperation {
    run () {
        const stack = new Memory().getStack()
        const n1 = stack.pop()
        const n2 = stack.pop()
        if (n1 !== undefined && n2 !== undefined) new Memory().push(n1 * n2)
    }
}
