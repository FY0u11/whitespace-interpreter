import { IOperation } from '../IOperation'
import { Stack } from '../../Stack/Stack'

export class DuplicateOne implements IOperation {
    run () {
        new Stack().duplicate()
    }
}
