import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'
import { JUMP_COMMAND } from '../../types'

export class JumpLess implements IOperation {
    run (arg: string): string | void {
        const condition = new Memory().pop()
        if (condition < 0) {
            const [mark,] = arg.split(':')
            return JUMP_COMMAND + new Memory().getPosition(mark).toString()
        }
    }
}
