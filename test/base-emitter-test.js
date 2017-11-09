// test/base-emitter-test.js

const {expect} = require('chai');

const baseEmitterMethods = require('./helpers/base-emitter-methods');
const emitter = require('..').getBaseEmitter;

describe('emitter', () => {
  it('should be a function', () => {
    expect(emitter).to.be.a('function');
  });

  context('instance', () => {
    let instance;

    beforeEach(() => {
      instance = emitter();
    });

    it('should return an object', () => {
      expect(instance).to.be.an('object');
      expect(instance).not.to.be.a('null');
    });

    // Check base methods
    baseEmitterMethods.forEach((name) => {
      it(`should respond to ${name}()`, () => {
        expect(instance).respondsTo(name);
      });
    });

    context('#aNumber()', () => {
      let number;

      beforeEach(() => {
        number = instance.aNumber;
      });

      it('should stringify usual numbers', () => {
        expect(number(24.5)).to.eq('24.5');
      });

      it('should return `NaN` for not a number', () => {
        expect(number(0 / 0)).to.eq('NaN');
      });

      it('should return `Infinity` for 1 / 0', () => {
        expect(number(1 / 0)).to.eq('Infinity');
      });

      it('should return `-Infinity` for -1 / 0', () => {
        expect(number(-1 / 0)).to.eq('-Infinity');
      });
    });

    context('#aString()', () => {
      let string;

      beforeEach(() => {
        string = instance.aString;
      });

      it('should stringify simple string', () => {
        expect(string("Hello")).to.eq('"Hello"');
      });

      it('should escape quotes', () => {
        expect(string("I said, \"Hello\"")).to.eq('"I said, \\"Hello\\""');
      });

      it('should escape next line chars', () => {
        expect(string('Hello\nJohn\nDoe!')).to.eq('"Hello\\nJohn\\nDoe!"');
      });

      it('should escape tab chars', () => {
        expect(string('First\tsecond')).to.eq('"First\\tsecond"');
      });
    });

    context('#aBoolean', () => {
      let boolean;

      beforeEach(() => {
        boolean = instance.aBoolean;
      });

      it('should return `true` for true', () => {
        expect(boolean(true)).to.eq('true');
      });

      it('should return `false` for false', () => {
        expect(boolean(false)).to.eq('false');
      });
    });

    context('#aFunction', () => {
      let aFunction;

      beforeEach(() => {
        aFunction = instance.aFunction;
      });

      it('should return `function (a, b) {...}` for usual function', () => {
        expect(aFunction('function (a, b) { var i = 5; }')).to.eq('function (a, b) {...}');
      });

      it('should return `(c, d) => {...}` for arrow function', () => {
        expect(aFunction('(c, d) => { var j = 7; }')).to.eq('(c, d) => {...}');
      });

      it('should return `(b = {c: {}}) => {...}` for arrow function', () => {
        expect(aFunction((b = {c: {}}) => {})).to.eq('(b = {c: {}}) => {...}');
      });

      it('should return `(b = ")=>{", c = {}) => {...}` for arrow function', () => {
        expect(aFunction((b = ")=>{", c = {}) => {})).to.eq('(b = ")=>{", c = {}) => {...}');
      });
    });

    context('#symbol', () => {
      it('should return `+` for +', () => {
        expect(instance.symbol('+')).to.eq('+');
      });
    });

    context('#keyword', () => {
      it('should return `function` for function', () => {
        expect(instance.keyword('function')).to.eq('function');
      });
    });

    it('should return `[` from #startArray()', () => {
      expect(instance.startArray()).to.eq('[');
    });

    it('should return `]` from #endArray()', () => {
      expect(instance.endArray()).to.eq(']');
    });

    it('should return `{` from #startObject()', () => {
      expect(instance.startObject()).to.eq('{');
    });

    it('should return `}` from #endObject()', () => {
      expect(instance.endObject()).to.eq('}');
    });
  });
});
