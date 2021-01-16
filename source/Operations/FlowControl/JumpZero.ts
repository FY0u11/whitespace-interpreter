import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'
import { JUMP_COMMAND } from '../../types'

export class JumpZero implements IOperation {
    run (arg: string): string | void {
        const condition = new Memory().pop()
        if (!condition) {
            const [mark,] = arg.split(':')
            return JUMP_COMMAND + new Memory().getPosition(mark).toString()
        }
    }
}
