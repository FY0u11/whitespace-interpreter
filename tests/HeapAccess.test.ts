import * as assert from 'assert'
import { whitespace } from '../source/Whitespace'
import { Utils } from '../source/Utils'
import { Memory } from '../source/Memory/Memory'

beforeEach(() => {
    new Memory().reset()
})

describe ('Heap Access tests: STORE operation', () => {
    it ('Should store number 15 at heap address 5', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(5, 15))
        whitespace('\t\t ')
        assert.strictEqual(new Memory().getHeap().length, 6)
        assert.strictEqual(new Memory().getStack().length, 0)
        assert.strictEqual(new Memory().getHeap()[5], 15)
    })
    it ('Should store number 0 at heap address 0', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(0, 0))
        whitespace('\t\t ')
        assert.strictEqual(new Memory().getHeap().length, 1)
        assert.strictEqual(new Memory().getStack().length, 0)
        assert.strictEqual(new Memory().getHeap()[0], 0)
    })
    it ('Should replace stored values', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(0, 10))
        whitespace('\t\t ')
        assert.strictEqual(new Memory().getHeap()[0], 10)
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(0, 20))
        whitespace('\t\t ')
        assert.strictEqual(new Memory().getHeap()[0], 20)
    })
    it ('Should store N random numbers 15 at heap addresses 0 to N', () => {
        const n = Utils.getRandomInt(3, 10)
        const randomNumbers = new Array(n).fill(0).map(n => Utils.getRandomInt(-10e10, 10e10))
        for (let i = 0; i < n; i++) {
            whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(i, randomNumbers[i]))
            whitespace('\t\t ')
        }
        assert.strictEqual(new Memory().getHeap().length, n)
        assert.strictEqual(new Memory().getStack().length, 0)
        randomNumbers.forEach((n, i) => assert.strictEqual(new Memory().getHeap()[i], n))
    })
    it ('Should do nothing when Stack.length <= 1, but clean the Stack', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(15))
        whitespace('\t\t ')
        assert.strictEqual(new Memory().getHeap().length, 0)
        assert.strictEqual(new Memory().getStack().length, 0)
    })
})

describe('Heap Access tests: PUSH operation', () => {
    it('It should pop A and then push the value at heap address A into the stack.', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10, 20))
        whitespace('\t\t ')
        assert.strictEqual(new Memory().getStack().length, 0)
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(10))
        whitespace('\t\t\t')
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], 20)
    })
    it('It should pop 0 and then push the value 0 at heap address 0 into the stack.', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(0, 0))
        whitespace('\t\t ')
        assert.strictEqual(new Memory().getStack().length, 0)
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(0))
        whitespace('\t\t\t')
        assert.strictEqual(new Memory().getStack().length, 1)
        assert.strictEqual(new Memory().getStack()[0], 0)
    })
    it('It should do nothing when Stack.length = 0', () => {
        whitespace('\t\t\t')
        assert.strictEqual(new Memory().getStack().length, 0)
        assert.strictEqual(new Memory().getHeap().length, 0)
    })
    it('It should do nothing when heap with address A is empty but pop A', () => {
        whitespace(Utils.getSourceCodeForPushingNNumbersIntoTheStack(25))
        whitespace('\t\t\t')
        assert.strictEqual(new Memory().getStack().length, 0)
        assert.strictEqual(new Memory().getHeap().length, 0)
    })
})
