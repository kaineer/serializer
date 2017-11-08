// lib/base-emitter.js

var escapeStringValue = function (value) {
  return value.
    replace(/"/g, '\\"').
    replace(/\n/g, '\\n').
    replace(/\t/g, '\\t').
    replace(/</g, '&lt;');
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

      // FIXME .aFunction((b = {}) => {})
      var br = baseValue.indexOf('{');
      return baseValue.substr(0, br - 1) + ' {...}';
    },

    startArray: function () {
      return this.symbol('[');
    },

    endArray: function () {
      return this.symbol(']');
    },

    endItem: function () {
      return this.symbol(',') + ' ';
    },

    nextLine: function() {
      return '';
    },

    startObject: function () {
      return this.symbol('{');
    },

    endObject: function () {
      return this.symbol('}');
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
