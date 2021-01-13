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
