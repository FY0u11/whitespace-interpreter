import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class DiscardOne implements IOperation {
    run () {
        new Memory().discard()
    }
}
