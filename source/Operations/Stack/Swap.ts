import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class Swap implements IOperation {
    run () {
        new Memory().swap()
    }
}
