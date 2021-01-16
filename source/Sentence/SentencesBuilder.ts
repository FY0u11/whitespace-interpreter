import { Sentence } from './Sentence'
import { allowedCharacters, SentenceChar, SentenceIterator, SentenceStates, OperationTypes } from '../types'
import { Memory } from '../Memory/Memory'

export class SentencesBuilder {
    private inputTimes: number = 0
    private readonly inputStream: string[] = []
    private sourceCode: string
    private _sourceCodePointer: number = 0

    constructor (sourceCode: string, inputStreamString: string = '') {
        this.sourceCode = sourceCode
        if (inputStreamString.includes('\n'))
        this.inputStream = inputStreamString.split('\n')
        else {
            let tmp = []
            for (let char of inputStreamString) tmp.push(char)
            this.inputStream = tmp
        }
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
                        const sentence = new Sentence(that._sourceCodePointer)
                        let done = false
                        while (sentence.getSentenceReadiness() !== SentenceStates.READY) {
                            if (sentence.getSentenceReadiness() === SentenceStates.IN_PROGRESS ||
                                sentence.getSentenceReadiness() === SentenceStates.WAITING_FOR_LABEL ||
                                sentence.getSentenceReadiness() === SentenceStates.WAITING_FOR_NUMBER) {
                                if (that.sourceCode.length === that._sourceCodePointer) {
                                    done = true
                                    break
                                }
                                const currentChar = SentencesBuilder.parseChar(that.sourceCode[that._sourceCodePointer++])
                                if (currentChar) {
                                    switch (sentence.getSentenceReadiness()) {
                                        case SentenceStates.IN_PROGRESS: sentence.feed(currentChar); break
                                        case SentenceStates.WAITING_FOR_LABEL: sentence.feedLabel(currentChar, that._sourceCodePointer); break
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

    findMarks () {
        const sB = new SentencesBuilder(this.sourceCode)
        let acc = 0
        for (let sentence of sB.buildSentences()) {
            if (sentence && sentence.operationType === OperationTypes.FLOW_CONTROL_MARK) {
                const [mark, position] = sentence.label.split(':')
                const diff = Number.parseInt(position) - sentence.startPosition
                const newPosition = (Number.parseInt(position) - diff - acc).toString()
                this.sourceCode = this.sourceCode.substring(0, sentence.startPosition - acc) + this.sourceCode.substring(Number.parseInt(position) - acc, this.sourceCode.length)
                new Memory().saveMark(mark, newPosition)
                acc += diff
            }
        }
    }

    set sourceCodePointer (value: number) {
        this._sourceCodePointer = value
    }
}
