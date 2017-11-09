// lib/base-emitter.js

var escapeStringValue = function (value) {
  return value.
    replace(/"/g, '\\"').
    replace(/\n/g, '\\n').
    replace(/\t/g, '\\t').
    replace(/</g, '&lt;');
};

var functionWithArgs = function (string) {
  if (string.startsWith('function')) {
    var br = string.indexOf('{');

    return string.substr(0, br - 1);
  } else {
    var copy = string.
      replace(/'(([^']|\\')*)'/g, function (match, p1) {
        return '\'' + ' '.repeat(p1.length) + '\'';
      }).
      replace(/"(([^"]|\\")*)"/g, function (match, p1) {
        return '"' + ' '.repeat(p1.length) + '"';
      }).
      replace(/`(([^`]|\\`)*)`/g, function (match, p1) {
        return '`' + ' '.repeat(p1.length) + '`';
      });

    var arr = copy.indexOf('=>');
    var br = copy.indexOf('{', arr);

    return string.substr(0, br - 1);
  }
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

      // FIXME .aFunction((b = "=>{") => {})
      var fnArgs = functionWithArgs(baseValue);

      return fnArgs + ' {...}';
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
