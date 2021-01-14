import { IOperation } from '../IOperation'
import { Stack } from '../../Stack/Stack'
import { EXIT_COMMAND } from '../../types'

export class Exit implements IOperation {
    run (arg?: string | number): string {
        new Stack().reset()
        return EXIT_COMMAND
    }
}
