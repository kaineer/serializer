// lib/html-emitter.js

var getIndentingEmitter = require('./indenting-emitter');

var span = function (className, content) {
  return (
    '<span class="' +
    className +
    '">' +
    content +
    '</span>'
  );
};

module.exports = function () {
  var indentingEmitter = getIndentingEmitter();

  return Object.assign({}, indentingEmitter, {
    anUndefined: function () {
      return span('undefined', 'undefined');
    },

    aNull: function () {
      return span('null', 'null');
    },

    aNumber: function (value) {
      if (isNaN(value)) {
        return span('nan', 'NaN');
      } else if (isFinite(value)) {
        return span('number', value.toString());
      } else {
        if (value < 0) {
          return span('infinity', '-Infinity');
        } else {
          return span('infinity', 'Infinity');
        }
      }
    },

    aString: function (value) {
      return span('string', indentingEmitter.aString(value));
    },

    aBoolean: function (value) {
      return span('boolean', indentingEmitter.aBoolean(value));
    },

    aFunction: function (value) {
      // FIXME придётся парсить
      return span('function', indentingEmitter.aFunction(value));
    },

    symbol: function (value) {
      return span('symbol', indentingEmitter.symbol(value));
    },

    keyword: function (value) {
      return span('keyword', indentingEmitter.keyword(value));
    }
  });
};