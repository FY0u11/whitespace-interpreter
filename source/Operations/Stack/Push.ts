import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class Push implements IOperation {
    run (number: number) {
        new Memory().push(number)
    }
}
