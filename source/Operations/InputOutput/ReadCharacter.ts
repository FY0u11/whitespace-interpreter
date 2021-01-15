import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class ReadCharacter implements IOperation {
    run (_: string, inputStream: string): void {
        const location = new Memory().pop()
        if (location !== undefined && inputStream.length === 1) {
            new Memory().heapStore(location, inputStream.charCodeAt(0))
        }
    }
}
