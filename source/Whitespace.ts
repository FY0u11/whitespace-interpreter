import { SentenceBuilder } from './Sentence/SentenceBuilder'

export class Whitespace {
    private readonly sourceCode: string
    private output: string = ''
    private isExited: boolean = false

    constructor (sourceCode: string) {
        this.sourceCode = sourceCode
    }

    readSourceCode (): string | void {
        const sB = SentenceBuilder.getInstance()
        for (let char of this.sourceCode) {
            if (sB.setChar(char)) {
                const sentence = sB.getSentence()
                try {
                    const result = sentence.execute()
                    if (result) {
                        if (result === '$EXIT$') {
                            this.isExited = true
                            break
                        } else {
                            this.output += result
                        }
                    }
                } catch (e) {
                    throw new Error(e.message)
                } finally {
                    sB.reset()
                }
            }
        }

        if (this.isExited) {
            this.isExited = false
            if (this.output) return this.output
        }
    }
}

export function whitespace (n: string): string | void {
    const ws = new Whitespace(n)
    return ws.readSourceCode()
}
