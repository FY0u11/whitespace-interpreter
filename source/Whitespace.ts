import { CommandFactory } from './Commands/CommandFactory'
import { Stack } from './Stack'

export class Whitespace {
    private readonly sourceCode: string

    constructor (sourceCode: string) {
        this.sourceCode = sourceCode
    }


    readSourceCode () {
        const cB = CommandBuilder.getInstance()
        for (let char of this.sourceCode) {
            if (cB.setChar(char)) {
                const command = cB.getCommand()
                command.execute()
                cB.reset()
            }
        }
        console.log(new Stack().getStack())
    }
}

const SPACE                =    'SPACE'
const TAB                  =    'TAB'
const NEW_LINE             =    'NEW_LINE'
const allowedCharacters    =    { ' ': SPACE, '\t' : TAB, '\n' : NEW_LINE }
type CommandChar           =    typeof SPACE | typeof TAB | typeof NEW_LINE

export enum Operation {
    STACK_PUSH = 'STACK_PUSH',
    STACK_DUPLICATE_ONE = 'STACK_DUPLICATE_ONE',
    STACK_DUPLICATE_MANY = 'STACK_DUPLICATE_MANY',
    STACK_DISCARD_ONE = 'STACK_DISCARD_ONE',
    STACK_DISCARD_MANY = 'STACK_DISCARD_MANY',
    STACK_SWAP = 'STACK_SWAP'
}

export enum DataTypes {
    NUMBER = 'NUMBER',
    LABEL = 'LABEL'
}

type OperationObject = {
    SPACE?: object,
    TAB?: object,
    NEW_LINE?: object,
    operation?: Operation,
    argument?: DataTypes
}

const operations = {
    SPACE: {
        SPACE: {
            operation: Operation.STACK_PUSH,
            argument: DataTypes.NUMBER
        },
        TAB: {
            SPACE: {
                operation: Operation.STACK_DUPLICATE_MANY,
                argument: DataTypes.NUMBER
            },
            NEW_LINE: {
                operation: Operation.STACK_DISCARD_MANY,
                argument: DataTypes.NUMBER
            }
        },
        NEW_LINE: {
            SPACE: {
                operation: Operation.STACK_DUPLICATE_ONE
            },
            TAB: {
                operation: Operation.STACK_SWAP
            },
            NEW_LINE: {
                operation: Operation.STACK_DISCARD_ONE
            }
        }
    },
    TAB: {

    },
    NEW_LINE: {

    }
}

enum CommandStates {
    READY = 'READY',
    IN_PROGRESS = 'IN_PROGRESS',
    WAITING_FOR_NUMBER = 'WAITING_FOR_NUMBER',
    WAITING_FOR_LABEL = 'WAITING_FOR_LABEL'
}

export class Command {
    private commandChain: OperationObject = operations
    private command: Operation | null = null
    private state: CommandStates = CommandStates.IN_PROGRESS
    private sign: typeof SPACE | typeof TAB | null = null
    private number: string | number = '0'

    public feed (commandChar: CommandChar) {
        if (this.commandChain[commandChar] !== undefined) {
            this.commandChain = this.commandChain[commandChar] as OperationObject
        } else throw new Error ('Cannot parse source code')
        this.updateCommandReadiness()
    }

    public feedNumber (commandChar: CommandChar) {
        if (!this.sign) {
            if (commandChar === NEW_LINE) throw new Error ('Cannot parse number code')
            this.sign = commandChar
        } else {
            if (commandChar === NEW_LINE) {
                this.state = CommandStates.READY
                this.number = Number.parseInt(this.number as string, 2)
            }
            else {
                this.number += commandChar === SPACE ? '0' : '1'
            }
        }
    }

    public getCommandReadiness () {
        return this.state
    }

    public updateCommandReadiness () {
        if (Object.keys(this.commandChain).includes('operation')) {
            this.command = this.commandChain.operation!
            this.state = this.commandChain.argument
                ? this.commandChain.argument === DataTypes.NUMBER
                    ? CommandStates.WAITING_FOR_NUMBER
                    : CommandStates.WAITING_FOR_LABEL
                : CommandStates.READY
        }
    }

    public execute () {
        if (this.state === CommandStates.READY) {
            const commandFactory = new CommandFactory()
            const command = commandFactory.getCommand(this.command!)
            command.execute(this.number)
        }
    }

    feedLabel (commandChar: CommandChar) {
        // TODO
    }
}

class CommandBuilder {
    private static instance: CommandBuilder
    private command: Command = new Command()
    private commandChar: CommandChar = SPACE

    private constructor () {}

    public static getInstance (): CommandBuilder {
        if (CommandBuilder.instance) {
            return CommandBuilder.instance
        }

        CommandBuilder.instance = new CommandBuilder()
        return CommandBuilder.instance
    }

    public setChar (char: string): boolean {
        if (this.checkCharacter(char)) {
            this.commandChar = allowedCharacters[char as ' ' | '\t' | '\n'] as CommandChar
            switch (this.command.getCommandReadiness()) {
                case CommandStates.IN_PROGRESS: this.command.feed(this.commandChar); break
                case CommandStates.WAITING_FOR_LABEL: this.command.feedLabel(this.commandChar); break
                case CommandStates.WAITING_FOR_NUMBER: this.command.feedNumber(this.commandChar); break
                case CommandStates.READY: throw new Error('This should be unreachable')
            }
        }
        return this.command.getCommandReadiness() === CommandStates.READY
    }

    public checkCharacter (char: string) {
        return char in allowedCharacters
    }

    public reset () {
        this.command = new Command()
    }

    public getCommand (): Command {
        return this.command
    }
}
