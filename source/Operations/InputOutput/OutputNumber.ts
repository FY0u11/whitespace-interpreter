import { IOperation } from '../IOperation'
import { Stack } from '../../Stack/Stack'

export class OutputNumber implements IOperation {
    run (arg?: string | number): string {
        const number = new Stack().pop()
        if (number) {
            return number.toString(10)
        } else return ''
    }
}
