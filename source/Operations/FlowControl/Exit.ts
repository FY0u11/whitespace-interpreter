import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'
import { EXIT_COMMAND } from '../../types'

export class Exit implements IOperation {
    run (): string {
        new Memory().reset()
        return EXIT_COMMAND
    }
}
