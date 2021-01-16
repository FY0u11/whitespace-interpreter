import { SentencesBuilder } from './Sentence/SentencesBuilder'

export class Whitespace {
    private readonly sourceCode: string
    private readonly inputStream: string
    private output: string = ''

    constructor (sourceCode: string, inputStream: string = '') {
        this.sourceCode = sourceCode
        this.inputStream = inputStream
    }

    readSourceCode (): string | void {
        const sB = new SentencesBuilder(this.sourceCode, this.inputStream)
        for (let sentence of sB.buildSentences()) {
            try {
                if (sentence) {
                    const result = sentence.execute()
                    if (result) {
                        if (result === '$EXIT$') {
                            return this.output
                        } else if (/\$JUMP\$/.test(result)) {
                            const [, position] = result.split(':')
                            sB.sourceCodePointer = Number.parseInt(position)
                        } else {
                            this.output += result
                        }
                    }
                }
            } catch (e) {
                throw new Error(e.message)
            }
        }
    }
}

export function whitespace (sourceCode: string, inputStream: string = ''): string | void {
    if (!sourceCode) throw new Error('Source code cannot be empty')
    const ws = new Whitespace(sourceCode, inputStream)
    return ws.readSourceCode()
}
