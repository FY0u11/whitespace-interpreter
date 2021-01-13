import { SentenceBuilder } from './Sentence/SentenceBuilder'

export class Whitespace {
    private readonly sourceCode: string

    constructor (sourceCode: string) {
        this.sourceCode = sourceCode
    }

    readSourceCode () {
        const sB = SentenceBuilder.getInstance()
        for (let char of this.sourceCode) {
            if (sB.setChar(char)) {
                const sentence = sB.getSentence()
                try {
                    sentence.execute()
                } catch (e) {
                    throw new Error(e.message)
                } finally {
                    sB.reset()
                }
            }
        }
    }
}
