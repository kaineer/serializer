// lib/base-emitter.js

var escapeStringValue = function (value) {
  return value.
    replace(/"/g, '\\"').
    replace(/\n/g, '\\n').
    replace(/\t/g, '\\t');
};

module.exports = function () {
  return {
    anUndefined: function () {
      return 'undefined';
    },

    aNull: function () {
      return 'null';
    },

    aNumber: function (value) {
      return value.toString();
    },

    aString: function (value) {
      return (
        '"' +
        escapeStringValue(value) +
        '"'
      );
    },

    aBoolean: function (value) {
      return value.toString();
    },

    aSymbol: function (value) {
      return value.toString();
    },

    aFunction: function (value) {
      var baseValue = value.toString();

      // TODO: default values?
      var br = baseValue.indexOf('{');
      return baseValue.substr(0, br - 1) + ' {...}';
    },

    startArray: function () {
      return '[';
    },

    endArray: function () {
      return ']';
    },

    startObject: function () {
      return '{';
    },

    endObject: function () {
      return '}';
    },

    objectKey: function (value) {
      return value;
    },

    symbol: function (value) {
      return value;
    },

    keyword: function (value) {
      return value;
    },

    indent: function (level) {
      return '';
    }
  }
};
