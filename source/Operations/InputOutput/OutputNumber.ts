import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class OutputNumber implements IOperation {
    run (): string {
        const number = new Memory().pop()
        return number.toString(10)
    }
}
