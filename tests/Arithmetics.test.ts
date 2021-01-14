import * as assert from 'assert'
import { Whitespace } from '../source/Whitespace'
import { beforeEach } from 'mocha'
import { Stack } from '../source/Stack/Stack'
import { Utils } from '../source/Utils'

beforeEach(() => {
    new Stack().reset()
})

describe('Arithmetic tests: SUM operation', () => {
    it('Should sum 144 with 56 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(144, 56)).readSourceCode()
        new Whitespace('\t   ').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[2], 200)
    })
    it('Should sum -8 and 8 push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(-8, 8)).readSourceCode()
        new Whitespace('\t   ').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[2], 0)
    })
    it('Should sum -12 and -24 push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, -12, -24)).readSourceCode()
        new Whitespace('\t   ').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 5)
        assert.strictEqual(new Stack().getStack()[4], -36)
    })
    it('Should sum -0 with 0 and push result into the stack', () => {
        new Whitespace('  \t\n   \n').readSourceCode()
        new Whitespace('\t   ').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[2], 0)
    })
    it('Should do nothing when stack.length <= 1', () => {
        new Whitespace('  \t\n').readSourceCode()
        new Whitespace('\t   ').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 1)
    })
})

describe('Arithmetic tests: SUBTRACT operation', () => {
    it('Should subtract 56 from 144 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(144, 56)).readSourceCode()
        new Whitespace('\t  \t').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[2], 88)
    })
    it('Should subtract 8 from -8 push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(-8, 8)).readSourceCode()
        new Whitespace('\t  \t').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[2], -16)
    })
    it('Should subtract -24 from -12 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, -12, -24)).readSourceCode()
        new Whitespace('\t  \t').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 5)
        assert.strictEqual(new Stack().getStack()[4], 12)
    })
    it('Should subtract 0 from -0 and push result into the stack', () => {
        new Whitespace('  \t\n   \n').readSourceCode()
        new Whitespace('\t  \t').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[2], -0)
    })
    it('Should do nothing when stack.length <= 1', () => {
        new Whitespace('  \t\n').readSourceCode()
        new Whitespace('\t  \t').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 1)
    })
})

describe('Arithmetic tests: MUL operation', () => {
    it('Should multiply 10 by 20 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20)).readSourceCode()
        new Whitespace('\t  \n').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[2], 200)
    })
    it('Should multiply 8 by -8 push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(-8, 8)).readSourceCode()
        new Whitespace('\t  \n').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[2], -64)
    })
    it('Should multiply -24 by -12  push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, -12, -24)).readSourceCode()
        new Whitespace('\t  \n').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 5)
        assert.strictEqual(new Stack().getStack()[4], 288)
    })
    it('Should multiply 0 by -0 and push result into the stack', () => {
        new Whitespace('  \t\n   \n').readSourceCode()
        new Whitespace('\t  \n').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[2], -0)
    })
    it('Should do nothing when stack.length <= 1', () => {
        new Whitespace('  \t\n').readSourceCode()
        new Whitespace('\t  \n').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 1)
    })
})

describe('Arithmetic tests: DIV operation', () => {
    it('Should divide 60 by 10 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(60, 10)).readSourceCode()
        new Whitespace('\t \t ').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[2], 6)
    })
    it('Should divide -8 by 8 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(-8, 8)).readSourceCode()
        new Whitespace('\t \t ').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[2], -1)
    })
    it('Should divide -40 by -20 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, -40, -20)).readSourceCode()
        new Whitespace('\t \t ').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 5)
        assert.strictEqual(new Stack().getStack()[4], 2)
    })
    it('Should throw an error when divisor is 0', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(50, 0)).readSourceCode()
        try {
            new Whitespace('\t \t ').readSourceCode()
            assert.fail()
        } catch (e) {}
    })
    it('Should do nothing when stack.length <= 1', () => {
        new Whitespace('  \t\n').readSourceCode()
        new Whitespace('\t \t ').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 1)
    })
})

describe('Arithmetic tests: MOD operation', () => {
    it('Should mod 10 by -25 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, -25)).readSourceCode()
        new Whitespace('\t \t\t').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[2], -15)
    })
    it('Should mod 10 by 15 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 15)).readSourceCode()
        new Whitespace('\t \t\t').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[2], 10)
    })
    it('Should mod -20 by -40 and push result into the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, -20, -40)).readSourceCode()
        new Whitespace('\t \t\t').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 5)
        assert.strictEqual(new Stack().getStack()[4], -20)
    })
    it('Should throw an error when divisor is 0', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(50, 0)).readSourceCode()
        try {
            new Whitespace('\t \t\t').readSourceCode()
            assert.fail()
        } catch (e) {}
    })
    it('Should do nothing when stack.length <= 1', () => {
        new Whitespace('  \t\n').readSourceCode()
        new Whitespace('\t \t\t').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 1)
    })
})
