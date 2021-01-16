import * as assert from 'assert'
import { Whitespace } from '../source/Whitespace'
import { Memory } from '../source/Memory/Memory'

beforeEach(() => {
    new Memory().reset()
})

describe('General tests', () => {
    it('Should push 10 and 20 into the stack despite on extra symbols in the source code', () => {
        const sourceCode = 'Lorem ipsum dolor sit\tamet, consectetur\tadipiscing elit.\nSuspendisse sit amet ligula\tsit amet\tmagna scelerisque blandit\na\nb\nc\nd'
        new Whitespace(sourceCode).readSourceCode()
        assert.strictEqual(new Memory().getStack().length, 2)
        assert.strictEqual(new Memory().getStack()[0], 10)
        assert.strictEqual(new Memory().getStack()[1], 20)
    })
})
