import { IOperation } from '../IOperation'
import { Errors, JUMP_COMMAND } from '../../types'
import { Memory } from '../../Memory/Memory'

export class SubExit implements IOperation {
    run (): string {
        const backPosition = new Memory().subRoutinePop()
        if (backPosition === undefined) throw new Error (Errors.SUB_RETURN_OUTSIDE_SUB_CALL)
        return JUMP_COMMAND + backPosition.toString()
    }
}
