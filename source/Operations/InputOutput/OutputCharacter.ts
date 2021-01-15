import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class OutputCharacter implements IOperation {
    run (): string {
        const charCode = new Memory().pop()
        if (charCode !== undefined) {
            return String.fromCharCode(charCode)
        } else return ''
    }
}
