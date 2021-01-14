import { IOperation } from '../IOperation'
import { Stack } from '../../Stack/Stack'

export class Mul implements IOperation {
    run () {
        const stack = new Stack().getStack()
        const n1 = stack.pop()
        const n2 = stack.pop()
        if (n1 !== undefined && n2 !== undefined) new Stack().push(n1 * n2)
    }
}
