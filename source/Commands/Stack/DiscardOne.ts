import { ICommand } from '../ICommand'
import { Stack } from '../../Stack'

export class DiscardOne implements ICommand {
    execute () {
        new Stack().discardOne()
    }
}
