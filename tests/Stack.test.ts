import * as assert from 'assert'
import { Whitespace } from '../source/Whitespace'
import { beforeEach } from 'mocha'
import { Stack } from '../source/Stack/Stack'
import { Utils } from '../source/Utils'

beforeEach(() => {
    new Stack().reset()
})

describe('Stack manipulation tests: PUSH operation', () => {
    it('Should push a number 0 into the stack (positive sign + terminal)', () => {
        new Whitespace('   \n').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 1)
        assert.strictEqual(new Stack().getStack()[0], 0)
    })
    it('Should push a number -0 into the stack (negative sign + terminal)', () => {
        new Whitespace('  \t\n').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 1)
        assert.strictEqual(new Stack().getStack()[0], -0)
    })
    it('Should push a number 0 into the stack (positive sign + several 0 + terminal)', () => {
        new Whitespace('             \n').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 1)
        assert.strictEqual(new Stack().getStack()[0], 0)
    })
    it('Should push a number -0 into the stack (negative sign + several 0 + terminal)', () => {
        new Whitespace('  \t      \n').readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 1)
        assert.strictEqual(new Stack().getStack()[0], -0)
    })
    it('Should push N random numbers into the stack', () => {
        const n = Utils.getRandomInt(3, 10)
        const numbers: number[] = [ ...Array(n) ].map(() => Utils.getRandomInt(-10e10, 10e10))
        numbers.forEach(n => new Whitespace(`  ${Utils.encodeNumber(n)}\n`).readSourceCode())
        assert.strictEqual(new Stack().getStack().length, n)
        new Stack().getStack().forEach((v, i) => assert.strictEqual(numbers[i], v))
    })
})

describe('Stack manipulation tests: SWAP operation', () => {
    it('Should swap top two values in the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack()).readSourceCode() // pushing 0 and then 1
        new Whitespace(' \n\t').readSourceCode() // swapping
        assert.strictEqual(new Stack().getStack()[0], 1)
        assert.strictEqual(new Stack().getStack()[1], 0)
        new Whitespace(' \n\t').readSourceCode() // swapping
        assert.strictEqual(new Stack().getStack()[0], 0)
        assert.strictEqual(new Stack().getStack()[1], 1)
    })
    it('Should do nothing if stack has less than 2 values', () => {
        // stack is empty for now
        new Whitespace(' \n\t').readSourceCode() // swapping
        assert.strictEqual(new Stack().getStack().length, 0)
        new Whitespace('   \n').readSourceCode() // pushing 0 into the stack
        new Whitespace(' \n\t').readSourceCode() // swapping
        assert.strictEqual(new Stack().getStack()[0], 0)
        new Whitespace(' \n\t').readSourceCode() // swapping
        assert.strictEqual(new Stack().getStack()[0], 0)
        assert.strictEqual(new Stack().getStack().length, 1)
    })
})

describe('Stack manipulation tests: DISCARD_ONE operation', () => {
    it('Should discard top value from the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20)).readSourceCode() // pushing 10 and then 20
        new Whitespace(' \n\n').readSourceCode() // discard
        assert.strictEqual(new Stack().getStack().length, 1)
        assert.strictEqual(new Stack().getStack()[0], 10)
        new Whitespace(' \n\n').readSourceCode() // discard
        assert.strictEqual(new Stack().getStack().length, 0)
        new Whitespace(' \n\n').readSourceCode() // discard
        assert.strictEqual(new Stack().getStack().length, 0)
    })
})

describe('Stack manipulation tests: DISCARD_MANY operation', () => {
    it('Should discard 2 values from the stack below a top value', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, 30, 40, 50)).readSourceCode() // pushing 10, 20, 30, 40, 50
        new Whitespace(' \t\n \t \n').readSourceCode() // discard 2 values
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[0], 10)
        assert.strictEqual(new Stack().getStack()[1], 20)
        assert.strictEqual(new Stack().getStack()[2], 50)
    })
    it('Should correctly discard N (N >= stack.length or N < 0) values from the stack (remove everything but the top value.)', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, 30)).readSourceCode() // pushing 10, 20, 30
        new Whitespace(' \t\n \t    \n').readSourceCode() // discard 16 values
        assert.strictEqual(new Stack().getStack().length, 1)
        assert.strictEqual(new Stack().getStack()[0], 30)
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, 30)).readSourceCode() // pushing 10, 20, 30
        new Whitespace(' \t\n\t\t    \n').readSourceCode() // discard -16 values
        assert.strictEqual(new Stack().getStack().length, 1)
        assert.strictEqual(new Stack().getStack()[0], 30)
    })
})

describe('Stack manipulation tests: DUPLICATE_ONE operation', () => {
    it('Should duplicate top value of the stack', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack()).readSourceCode() // pushing 0, 1
        new Whitespace(' \n ').readSourceCode() // duplicate top value
        assert.strictEqual(new Stack().getStack().length, 3)
        assert.strictEqual(new Stack().getStack()[0], 0)
        assert.strictEqual(new Stack().getStack()[1], 1)
        assert.strictEqual(new Stack().getStack()[2], 1)
    })
    it('Should do nothing when the stack is empty', () => {
        new Whitespace(' \n ').readSourceCode() // duplicate top value
        assert.strictEqual(new Stack().getStack().length, 0)
    })
})

describe('Stack manipulation tests: DUPLICATE_NTH operation', () => {
    it('Should duplicate Nth value of the stack and push it onto the top', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, 30, 40, 50)).readSourceCode() // pushing 10, 20, 30, 40, 50
        new Whitespace(' \t  \t\n').readSourceCode() // duplicate 1th (20) value
        assert.strictEqual(new Stack().getStack().length, 6)
        assert.strictEqual(new Stack().getStack()[0], 10)
        assert.strictEqual(new Stack().getStack()[1], 20)
        assert.strictEqual(new Stack().getStack()[2], 30)
        assert.strictEqual(new Stack().getStack()[3], 40)
        assert.strictEqual(new Stack().getStack()[4], 50)
        assert.strictEqual(new Stack().getStack()[5], 20)
    })
    it('Should do nothing when the stack is empty', () => {
        new Whitespace(' \t  \t\t\n').readSourceCode() // duplicate 3th value
        assert.strictEqual(new Stack().getStack().length, 0)
    })
    it('Should do nothing if Nth value is undefined', () => {
        new Whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20, 30, 40, 50)).readSourceCode() // pushing 10, 20, 30, 40, 50
        new Whitespace(' \t  \t   \n').readSourceCode() // duplicate 8th value
        assert.strictEqual(new Stack().getStack().length, 5)
    })
})
