import * as assert from 'assert'
import { whitespace } from '../source/Whitespace'
import { beforeEach } from 'mocha'
import { Stack } from '../source/Stack/Stack'
import { Utils } from '../source/Utils'

beforeEach(() => {
    new Stack().reset()
})

describe('Flow control tests: EXIT operation', () => {
    it('Should successfully exit and return some output', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(144, 56))
        const result = whitespace('\t   \t\n \t\n\n\n')
        assert.strictEqual(result, '200')
    })
    it('Should output nothing because program is not exited', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(144, 56))
        const result = whitespace('\t   \t\n \t')
        assert.strictEqual(result, undefined)
    })
    it('Should clean the stack when program is exited', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(1, 2, 3, 4, 5))
        whitespace('\n\n\n')
        assert.strictEqual(new Stack().getStack().length, 0)
    })
    it('Should ignore all source code after \\n\\n\\n', () => {
        whitespace('\n\n\n' + Utils.getSourceCodeForPushingNNumbersIntoTheStack())
        assert.strictEqual(new Stack().getStack().length, 0)
    })
})
