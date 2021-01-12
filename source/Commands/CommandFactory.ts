import { Operation } from '../Whitespace'
import { Push } from './Stack/Push'
import { ICommand } from './ICommand'
import { Swap } from './Stack/Swap'
import { DiscardOne } from './Stack/DiscardOne'

export class CommandFactory {
    getCommand (type: Operation): ICommand {
       switch (type) {
           case Operation.STACK_PUSH: return new Push()
           case Operation.STACK_SWAP: return new Swap()
           case Operation.STACK_DISCARD_ONE: return new DiscardOne()
           default: throw new Error('Not implemented yet ' + type)
       }
    }
}
