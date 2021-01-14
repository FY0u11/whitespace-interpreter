import { IOperation } from '../IOperation'
import { Stack } from '../../Stack/Stack'

export class Div implements IOperation {
    run () {
        const stack = new Stack().getStack()
        const n1 = stack.pop()
        const n2 = stack.pop()
        if (n1 !== undefined && n2 !== undefined) {
            if (n1 === 0 || n1 === -0) throw new Error('Can not perform division by 0')
            else new Stack().push(~~(n2 / n1))
        }
    }
}
