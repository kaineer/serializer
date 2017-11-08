// test/serializer-test.js

const {expect} = require('chai');
const {getSerializer, getBaseEmitter} = require('..');

describe('Serializer', () => {
  let serializer;

  beforeEach(() => {
    serializer = getSerializer(getBaseEmitter(), {maxIndentLevel: 5});
  });

  it('should be a function', () => {
    expect(serializer).to.be.a('function');
  });

  context('serializing a boolean', () => {
    it('should return true for true', () => {
      expect(serializer(true)).to.eq('true');
    });

    it('should return false for false', () => {
      expect(serializer(false)).to.eq('false');
    });
  });

  context('serializing a number', () => {
    it('should return `2.45` for 2.45', () => {
      expect(serializer(2.45)).to.eq('2.45');
    });

    it('should return `NaN` for 0 / 0', () => {
      expect(serializer(0 / 0)).to.eq('NaN');
    });
  });

  context('serializing a string', () => {
    it('should return `"Hello"` for "Hello"', () => {
      expect(serializer('Hello')).to.eq('"Hello"');
    });
  });

  context('serializing a function', () => {
    it('should return (a, b) => {...} for arrow function', () => {
      expect(serializer((a, b) => {})).to.eq('(a, b) => {...}');
    });

    it('should return function (c, d) {...} for usual function', () => {
      expect(serializer(function (c, d) {})).to.eq('function (c, d) {...}');
    });
  });

  context('serializing a symbol', () => {
    it('should return `Symbol(hello)` for symbol', () => {
      expect(serializer(Symbol('hello'))).to.eq('Symbol(hello)');
    });
  });

  context('serializing an array', () => {
    it('should return `[1, 2, 3]` for [1, 2, 3] array', () => {
      expect(serializer([1, 2, 3])).to.eq('[1, 2, 3]');
    });

    it('should handle nested arrays', () => {
      expect(serializer([1, [2, 3]])).to.eq('[1, [2, 3]]');
    });
  });

  context('serializing an object', () => {
    it('should return {answer: 42} for an object', () => {
      expect(serializer({answer: 42})).to.eq('{answer: 42}');
    });

    it('should handle array nested into object', () => {
      expect(serializer({targets: [38, 42]})).to.eq('{targets: [38, 42]}');
    });

    it('should skip too deep nesting', () => {
      expect(serializer({a: {b: {c: {d: {e: {f: {g: 1}}}}}}})).to.eq('{a: {b: {c: {d: {e: ...}}}}}');
    });

    it('should return {a: 1, b: 2} for an object', () => {
      expect(serializer({a: 1, b: 2})).to.eq('{a: 1, b: 2}');
    });
  });
});
