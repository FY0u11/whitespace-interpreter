import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class HeapPushInStack implements IOperation {
    run () {
        const location = new Memory().pop()
        const valueToPush = new Memory().heapGet(location)
        if (valueToPush !== undefined) {
            new Memory().push(valueToPush)
        }
    }
}
