import { IOperation } from '../IOperation'
import { Stack } from '../../Stack/Stack'

export class Push implements IOperation {
    run (number: number) {
        new Stack().push(number)
    }
}
