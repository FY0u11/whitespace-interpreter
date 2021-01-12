import { ICommand } from '../ICommand'
import { Stack } from '../../Stack'

export class Push implements ICommand {
    execute (number: number) {
        new Stack().push(number)
    }
}
