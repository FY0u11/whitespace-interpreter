import * as assert from 'assert'
import { Whitespace, whitespace } from '../source/Whitespace'
import { beforeEach } from 'mocha'
import { Memory } from '../source/Memory/Memory'
import { Utils } from '../source/Utils'
import { Errors } from '../source/types'

beforeEach(() => {
    new Memory().reset()
})

describe('Input output tests: OUTPUT_NUMBER operation', () => {
    it('Should output top value from the stack as number', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(144, 56))
        const result = whitespace('\t\n \t\n\n\n')
        assert.strictEqual(result, '56')
    })
    it('Should remove output value from the stack', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack())
        whitespace('\t\n \t')
        assert.strictEqual(new Memory().getStack().length, 1)
    })
    it('Should throw an Error when Stack is empty', () => {
        try {
           whitespace('\t\n \t')
        } catch (e) {
            assert.strictEqual(e.message, Errors.STACK_IS_EMPTY)
        }
    })
})

describe('Input output tests: OUTPUT_CHARACTER operation', () => {
    it('Should output top value from the stack as character', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(65))
        const result = whitespace('\t\n  \n\n\n')
        assert.strictEqual(result, 'A')
    })
    it('Should remove output value from the stack', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(65))
        whitespace('\t\n  ')
        assert.strictEqual(new Memory().getStack().length, 0)
    })
    it('Should throw an Error when Stack is empty', () => {
        try {
            whitespace('\t\n  ')
        } catch (e) {
            assert.strictEqual(e.message, Errors.STACK_IS_EMPTY)
        }
    })
})

describe('Input output tests: READ_NUMBER operation', () => {
    it('Should read a number from input stream and store it in heap address (top value of stack)', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10))
        whitespace('\t\n\t\t', '4')
        assert.strictEqual(new Memory().getHeap()[10], 4)
    })
    it('Should input several numbers in one input stream', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(0, 1, 2))
        whitespace('\t\n\t\t\t\n\t\t\t\n\t\t', '10\n20\n30')
        assert.strictEqual(new Memory().getHeap().length, 3)
        assert.strictEqual(new Memory().getHeap()[0], 30)
        assert.strictEqual(new Memory().getHeap()[1], 20)
        assert.strictEqual(new Memory().getHeap()[2], 10)
    })
    it('Should input zeros', () => {
        whitespace('   \n\t\n\t\t', '0')
        assert.strictEqual(new Memory().getStack().length, 0)
        assert.strictEqual(new Memory().getHeap().length, 1)
        assert.strictEqual(new Memory().getHeap()[0], 0)
    })
    it('Should throw an Error when Stack is empty', () => {
        try {
            whitespace('\t\n\t\t')
        } catch (e) {
            assert.strictEqual(e.message, Errors.STACK_IS_EMPTY)
        }
    })
    it('Should do nothing if input stream is not a number', () => {
        whitespace('   \t\n\t\n\t\t', 'Hello, world')
        assert.strictEqual(new Memory().getStack().length, 0)
        assert.strictEqual(new Memory().getHeap().length, 0)
    })
})

describe('Input output tests: READ_CHARACTER operation', () => {
    it('Should read a character from input stream and store it in heap address (top value of stack)', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10))
        whitespace('\t\n\t ', 'A')
        assert.strictEqual(new Memory().getHeap()[10], 65)
    })
    it('Should input several numbers in one input stream', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(0, 1, 2))
        whitespace('\t\n\t \t\n\t \t\n\t ', 'A\nB\nC')
        assert.strictEqual(new Memory().getHeap().length, 3)
        assert.strictEqual(new Memory().getHeap()[0], 67)
        assert.strictEqual(new Memory().getHeap()[1], 66)
        assert.strictEqual(new Memory().getHeap()[2], 65)
    })
    it('Should input zeros', () => {
        whitespace('   \n\t\n\t ', '0')
        assert.strictEqual(new Memory().getStack().length, 0)
        assert.strictEqual(new Memory().getHeap().length, 1)
        assert.strictEqual(new Memory().getHeap()[0], 48)
    })
    it('Should throw an Error when Stack is empty', () => {
        try {
            whitespace('\t\n\t ')
        } catch (e) {
            assert.strictEqual(e.message, Errors.STACK_IS_EMPTY)
        }
    })
    it('Should accept char by char when input stream has more than 1 symbol', () => {
        const result = whitespace('   \n\t\n\t    \t\n\t\n\t    \t \n\t\n\t    \n\t\t\t   \t\n\t\t\t   \t \n\t\t\t\t\n  \t\n  \t\n  \n\n\n', 'Hello, world')
        assert.strictEqual(result, 'leH')
    })
})