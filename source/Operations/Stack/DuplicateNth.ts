import { IOperation } from '../IOperation'
import { Stack } from '../../Stack/Stack'

export class DuplicateNth implements IOperation {
    run (arg?: string | number) {
        new Stack().duplicate(arg as number)
    }
}
