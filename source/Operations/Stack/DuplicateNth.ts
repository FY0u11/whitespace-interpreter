import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class DuplicateNth implements IOperation {
    run (arg: number) {
        new Memory().duplicate(arg)
    }
}
