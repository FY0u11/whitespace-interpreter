import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class DuplicateOne implements IOperation {
    run () {
        new Memory().duplicate()
    }
}
