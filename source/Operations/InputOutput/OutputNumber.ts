import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class OutputNumber implements IOperation {
    run (): string {
        const number = new Memory().pop()
        if (number !== undefined) {
            return number.toString(10)
        } else return ''
    }
}
