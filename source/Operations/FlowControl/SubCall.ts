import { IOperation } from '../IOperation'
import { JUMP_COMMAND } from '../../types'
import { Memory } from '../../Memory/Memory'

export class SubCall implements IOperation {
    run (arg: string): void | string {
        const [mark, location] = arg.split(':')
        new Memory().subRoutinePush(Number.parseInt(location))
        return JUMP_COMMAND + new Memory().getPosition(mark).toString()
    }
}
