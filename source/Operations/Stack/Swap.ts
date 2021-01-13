import { IOperation } from '../IOperation'
import { Stack } from '../../Stack/Stack'

export class Swap implements IOperation {
    run () {
        new Stack().swap()
    }
}
