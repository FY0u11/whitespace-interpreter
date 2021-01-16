import { IOperation } from '../IOperation'
import { Memory } from '../../Memory/Memory'

export class Mark implements IOperation {
    run (arg: string): void {
        const [mark, location] = arg.split(':')
        new Memory().saveMark(mark, location)
    }
}
