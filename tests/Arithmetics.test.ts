import * as assert from 'assert'
import { Whitespace } from '../source/Whitespace'
import { beforeEach } from 'mocha'
import { Memory } from '../source/Memory/Memory'
import { Utils } from '../source/Utils'
import { Errors } from '../source/types'

beforeEach(() => {
    new Memory().reset()
})

describe('Arithmetic tests: SUM operation', () => {
    it('Should sum 144 with 56 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(144, 56) + '\t   \n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], 200)
    })
    it('Should sum -8 and 8 push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(-8, 8) + '\t   \n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], 0)
    })
    it('Should sum -12 and -24 push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, -12, -24) + '\t   \n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 3)
        assert.strictEqual(new Memory().getStack()[2], -36)
    })
    it('Should sum -0 with 0 and push result into the stack', () => {
        new Whitespace('  \t\n   \n\t   \n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], 0)
    })
    it('Should throw an Error when stack.length <= 1', () => {
        try {
            new Whitespace('  \t\n\t   \n\n\n').readSourceCode()
        } catch (e) {
            assert.strictEqual(e.message, Errors.STACK_LESS_THAN_2)
        }
    })
})

describe('Arithmetic tests: SUBTRACT operation', () => {
    it('Should subtract 56 from 144 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(144, 56) + '\t  \t\n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], 88)
    })
    it('Should subtract 8 from -8 push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(-8, 8) + '\t  \t\n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], -16)
    })
    it('Should subtract -24 from -12 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, -12, -24) + '\t  \t\n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 3)
        assert.strictEqual(new Memory().getStack()[2], 12)
    })
    it('Should subtract 0 from -0 and push result into the stack', () => {
        new Whitespace('  \t\n   \n\t  \t\n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], -0)
    })
    it('Should throw an Error when Stack.length <= 1', () => {
        try {
            new Whitespace('  \t\n\t  \t\n\n\n').readSourceCode()
        } catch (e) {
            assert.strictEqual(e.message, Errors.STACK_LESS_THAN_2)
        }
    })
})

describe('Arithmetic tests: MUL operation', () => {
    it('Should multiply 10 by 20 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20) + '\t  \n\n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], 200)
    })
    it('Should multiply 8 by -8 push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(-8, 8) + '\t  \n\n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], -64)
    })
    it('Should multiply -24 by -12  push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, -12, -24) + '\t  \n\n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 3)
        assert.strictEqual(new Memory().getStack()[2], 288)
    })
    it('Should multiply 0 by -0 and push result into the stack', () => {
        new Whitespace('  \t\n   \n\t  \n\n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], -0)
    })
    it('Should throw an Error when Stack.length <= 1', () => {
        try {
            new Whitespace('  \t\n\t  \n\n\n\n').readSourceCode()
        } catch (e) {
            assert.strictEqual(e.message, Errors.STACK_LESS_THAN_2)
        }
    })
})

describe('Arithmetic tests: DIV operation', () => {
    it('Should divide 60 by 10 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(60, 10) + '\t \t \n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], 6)
    })
    it('Should divide -8 by 8 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(-8, 8) + '\t \t \n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], -1)
    })
    it('Should divide -40 by -20 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, -40, -20) + '\t \t \n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 3)
        assert.strictEqual(new Memory().getStack()[2], 2)
    })
    it('Should throw an Error when divisor is 0', () => {
        try {
            new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(50, 0) + '\t \t \n\n\n').readSourceCode()
        } catch (e) {
            assert.strictEqual(e.message, Errors.DIVISION_BY_ZERO)
        }
    })
    it('Should throw an Error when Stack.length <= 1', () => {
        try {
            new Whitespace('  \t\n\t \t \n\n\n').readSourceCode()
        } catch (e) {
            assert.strictEqual(e.message, Errors.STACK_LESS_THAN_2)
        }
    })
})

describe('Arithmetic tests: MOD operation', () => {
    it('Should mod 10 by -25 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, -25) + '\t \t\t\n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], -15)
    })
    it('Should mod 10 by 15 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 15) + '\t \t\t\n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], 10)
    })
    it('Should mod -20 by -40 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, -20, -40) + '\t \t\t\n\n\n').readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 3)
        assert.strictEqual(new Memory().getStack()[2], -20)
    })
    it('Should throw an error when divisor is 0', () => {
        try {
            new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(50, 0) + '\t \t\t\n\n\n').readSourceCode()
        } catch (e) {
            assert.strictEqual(e.message, Errors.DIVISION_BY_ZERO)
        }
    })
    it('Should throw an Error when Stack.length <= 1', () => {
        try {
            new Whitespace('  \t\n\t \t\t\n\n\n').readSourceCode()
        } catch (e) {
            assert.strictEqual(e.message, Errors.STACK_LESS_THAN_2)
        }
    })
})
