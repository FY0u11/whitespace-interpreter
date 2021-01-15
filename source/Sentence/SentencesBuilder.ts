import { Sentence } from './Sentence'
import { allowedCharacters, SentenceChar, SentenceIterator, SentenceStates } from '../types'

export class SentencesBuilder {
    private inputTimes: number = 0
    private readonly inputStream: string[] = []
    private readonly sourceCode: string
    private sourceCodePointer: number = 0

    constructor (sourceCode: string, inputStreamString: string = '') {
        this.sourceCode = sourceCode
        this.inputStream = inputStreamString.split('\n')
    }

    private static parseChar (char: string): SentenceChar | null {
        return char in allowedCharacters ? allowedCharacters[char as ' ' | '\t' | '\n'] as SentenceChar : null
    }

    public buildSentences (): SentenceIterator {
        const that = this
        return {
            [Symbol.iterator]() {
                return {
                    next () {
                        const sentence = new Sentence()
                        let done = false
                        while (sentence.getSentenceReadiness() !== SentenceStates.READY) {
                            if (sentence.getSentenceReadiness() === SentenceStates.IN_PROGRESS ||
                                sentence.getSentenceReadiness() === SentenceStates.WAITING_FOR_LABEL ||
                                sentence.getSentenceReadiness() === SentenceStates.WAITING_FOR_NUMBER) {
                                if (that.sourceCode.length === that.sourceCodePointer) {
                                    done = true
                                    break
                                }
                                const currentChar = SentencesBuilder.parseChar(that.sourceCode[that.sourceCodePointer++])
                                if (currentChar) {
                                    switch (sentence.getSentenceReadiness()) {
                                        case SentenceStates.IN_PROGRESS: sentence.feed(currentChar); break
                                        case SentenceStates.WAITING_FOR_LABEL: sentence.feedLabel(currentChar); break
                                        case SentenceStates.WAITING_FOR_NUMBER: sentence.feedNumber(currentChar); break
                                    }
                                }
                            } else if (sentence.getSentenceReadiness() === SentenceStates.WAITING_FOR_INPUT_STREAM) {
                                sentence.feedInputStream(that.inputStream[that.inputTimes++])
                            }
                        }
                        return done ? {
                            value: undefined,
                            done: true
                        } : {
                            value: sentence,
                            done: false
                        }
                    }
                }
            }
        }
    }
}
