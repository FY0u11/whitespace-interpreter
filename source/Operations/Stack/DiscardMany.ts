import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class DiscardMany implements IOperation {
    run (arg: number) {
        new Memory().discard(arg)
    }
}
