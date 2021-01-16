import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'
import { Utils } from '../../Utils'
import { Errors } from '../../types'

export class Mod implements IOperation {
    run () {
        if (new Memory().getStack().length <= 1) throw new Error (Errors.STACK_LESS_THAN_2)
        const n1 = new Memory().pop()
        const n2 = new Memory().pop()
        if (n1 === 0 || n1 === -0) throw new Error(Errors.DIVISION_BY_ZERO)
        else new Memory().push(Utils.mod(n2, n1))
    }
}
