import { Sentence } from './Sentence'
import { allowedCharacters, SentenceStates, SentenceChar, SPACE } from '../types'

export class SentenceBuilder {
    private static instance: SentenceBuilder
    private sentence: Sentence = new Sentence()
    private sentenceChar: SentenceChar = SPACE

    private constructor () {}

    public static getInstance (): SentenceBuilder {
        if (SentenceBuilder.instance) {
            return SentenceBuilder.instance
        }

        SentenceBuilder.instance = new SentenceBuilder()
        return SentenceBuilder.instance
    }

    public setChar (char: string): boolean {
        if (this.checkCharacter(char)) {
            this.sentenceChar = allowedCharacters[char as ' ' | '\t' | '\n'] as SentenceChar
            switch (this.sentence.getSentenceReadiness()) {
                case SentenceStates.IN_PROGRESS: this.sentence.feed(this.sentenceChar); break
                case SentenceStates.WAITING_FOR_LABEL: this.sentence.feedLabel(this.sentenceChar); break
                case SentenceStates.WAITING_FOR_NUMBER: this.sentence.feedNumber(this.sentenceChar); break
                case SentenceStates.READY: throw new Error('This should be unreachable')
            }
        }
        return this.sentence.getSentenceReadiness() === SentenceStates.READY
    }

    public checkCharacter (char: string) {
        return char in allowedCharacters
    }

    public reset () {
        this.sentence = new Sentence()
    }

    public getSentence (): Sentence {
        return this.sentence
    }
}
