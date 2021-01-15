import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class Store implements IOperation {
    run () {
        const value = new Memory().pop()
        const location = new Memory().pop()
        if (value !== undefined && location !== undefined) {
            new Memory().heapStore(location, value)
        }
    }
}
