import { IOperation } from '../IOperation'
import { Stack } from '../../Stack/Stack'

export class DiscardMany implements IOperation {
    run (arg: string | number) {
        new Stack().discard(arg as number)
    }
}
