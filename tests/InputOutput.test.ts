import * as assert from 'assert'
import { whitespace } from '../source/Whitespace'
import { beforeEach } from 'mocha'
import { Stack } from '../source/Stack/Stack'
import { Utils } from '../source/Utils'

beforeEach(() => {
    new Stack().reset()
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
        assert.strictEqual(new Stack().getStack().length, 1)
    })
    it('Should do nothing when stack.length <= 1', () => {
        const result = whitespace('\t\n \t')
        assert.strictEqual(new Stack().getStack().length, 0)
        assert.strictEqual(result, undefined)
    })
})
