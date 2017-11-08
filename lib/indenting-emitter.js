// lib/indenting-emitter.js

var getBaseEmitter = require('./base-emitter');

module.exports = function () {
  var baseEmitter = getBaseEmitter();

  return Object.assign(baseEmitter, {
    indent: function (level) {
      return (' ').repeat(level * 2);
    },

    endItem: function () {
      return this.symbol(',') + this.nextLine();
    },

    nextLine: function () {
      return '\n';
    }
  });
};