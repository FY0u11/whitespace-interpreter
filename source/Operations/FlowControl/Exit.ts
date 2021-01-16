import { IOperation } from '../IOperation'
import { EXIT_COMMAND } from '../../types'

export class Exit implements IOperation {
    run (): string {
        return EXIT_COMMAND
    }
}
