import * as assert from 'assert'
import { Whitespace } from '../source/Whitespace'
import { Stack } from '../source/Stack/Stack'

beforeEach(() => {
    new Stack().reset()
})

describe('General tests', () => {
    it('Should push 10 and 20 into the stack despite on extra symbols in the source code', () => {
        const sourceCode = `Lorem ipsum dolor sit\tamet, consectetur\tadipiscing elit.
                            Suspendisse sit amet ligula\tsit amet\tmagna scelerisque blandit
                            `
        new Whitespace(sourceCode).readSourceCode()
        assert.strictEqual(new Stack().getStack().length, 2)
        assert.strictEqual(new Stack().getStack()[0], 10)
        assert.strictEqual(new Stack().getStack()[1], 20)
    })
})
