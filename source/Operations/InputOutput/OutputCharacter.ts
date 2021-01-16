import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class OutputCharacter implements IOperation {
    run (): string {
        const charCode = new Memory().pop()
        return String.fromCharCode(charCode)
    }
}
