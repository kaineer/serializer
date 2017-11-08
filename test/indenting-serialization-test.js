// test/indenting-serialization-test.js

const {expect} = require('chai');
const {getSerializer, getIndentingEmitter} = require('..');

describe('Serializer + IndentingEmitter', () => {
  let serializer;

  beforeEach(() => {
    serializer = getSerializer(getIndentingEmitter());
  });

  it('should serialize each array item on separate line', () => {
    expect(serializer([1, 2, 3])).to.eq('[\n  1,\n  2,\n  3\n]');
  });

  it('should handle array nesting', () => {
    expect(serializer([1, [2, [3]]])).to.eq('[\n  1,\n  [\n    2,\n    [\n      3\n    ]\n  ]\n]');
  });

  it('should serialize each object entry on separate line', () => {
    expect(serializer({white: 1, black: 2})).to.eq('{\n  white: 1,\n  black: 2\n}');
  });

  it('should handle object nesting', () => {
    expect(serializer({targets: [38, 42]})).to.eq('{\n  targets: [\n    38,\n    42\n  ]\n}');
    expect(serializer({property: {color: 'green'}})).to.eq('{\n  property: {\n    color: "green"\n  }\n}');
  });
});
