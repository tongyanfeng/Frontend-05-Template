var assert = require('assert')
// var add = require('../add.js').add
// var mul = require('../add.js').mul
import { add, mul } from '../add'

// descript 是用来分目录，分组的工具。
// describe('Array', function () {
  describe('add function testing', function () {
    it('1 + 2 should be 3', function () {
      assert.equal(add(1, 2), 3)
    })
    
    it('-5 + 2 should be -3', function () {
      assert.equal(add(-5, 2), -3)
    })

    it('-5 * 2 should be -10', function () {
      assert.equal(mul(-5, 2), -10)
    })
  })
// })
