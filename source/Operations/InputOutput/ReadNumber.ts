import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class ReadNumber implements IOperation {
    run (_: string, inputStream: string): void {
        const location = new Memory().pop()
        if (location !== undefined && !Number.isNaN(Number.parseInt(inputStream))) {
            new Memory().heapStore(location, Number.parseInt(inputStream))
        }
    }
}
