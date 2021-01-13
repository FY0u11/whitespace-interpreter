import { Whitespace } from './Whitespace'
import { Stack } from './Stack/Stack'

const ws = new Whitespace('  \t\t\t\t\n')
ws.readSourceCode()
console.log(new Stack().getStack()) // output: 7
