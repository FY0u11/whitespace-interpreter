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
                sentence.execute()
                sB.reset()
            }
        }
    }
}
