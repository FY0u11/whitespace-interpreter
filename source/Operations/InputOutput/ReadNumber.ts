import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class ReadNumber implements IOperation {
    run (_: string, inputStream: string): void {
        const location = new Memory().pop()
        if (!Number.isNaN(Number.parseInt(inputStream))) {
            new Memory().heapStore(location, Number.parseInt(inputStream))
        }
    }
}
