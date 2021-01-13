import { IOperation } from '../IOperation'
import { Stack } from '../../Stack/Stack'

export class DiscardOne implements IOperation {
    run () {
        new Stack().discard()
    }
}
