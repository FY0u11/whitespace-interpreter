import * as assert from 'assert'
import { whitespace } from '../source/Whitespace'
import { beforeEach } from 'mocha'
import { Memory } from '../source/Memory/Memory'
import { Utils } from '../source/Utils'

beforeEach(() => {
    new Memory().reset()
})

describe('Flow control tests: EXIT operation', () => {
    it('Should successfully exit and return some output', () => {
        const result = whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(144, 56) + '\t   \t\n \t\n\n\n')
        assert.strictEqual(result, '200')
    })
    it ('Should throw an Error if program wasn\'t exited', () => {
        try {
            whitespace(' ')
        } catch (e) {
            assert.strictEqual(e.message, 'Program wasn\'t correctly terminated')
        }
    })
    it('Should ignore all source code after \\n\\n\\n', () => {
        whitespace('\n\n\n' + Utils.getSourceCodeForPushingNNumbersIntoTheStack())
        assert.strictEqual(new Memory().getStack().length, 0)
    })
})
