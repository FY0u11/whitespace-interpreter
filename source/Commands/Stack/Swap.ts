import { ICommand } from '../ICommand'
import { Stack } from '../../Stack'

export class Swap implements ICommand {
    execute () {
        new Stack().swap()
    }
}
