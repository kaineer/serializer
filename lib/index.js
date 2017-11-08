// lib/index.js

module.exports = {
  getSerializer: require('./serializer'),
  getBaseEmitter: require('./base-emitter'),
  getIndentingEmitter: require('./indenting-emitter'),
  getHtmlEmitter: require('./html-emitter')
};
