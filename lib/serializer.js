// lib/serializer.js

var defaultOpts = {
  maxIndentLevel: 6
  // ...
};

var getSerializer = function (emitter, opts) {
  if (typeof (opts) === 'undefined') {
    opts = {};
  }

  opts = Object.assign({}, defaultOpts, opts);

  var maxIndentLevel = opts.maxIndentLevel;

  var serializeArrayLike = function (obj, indentLevel) {
    var result = [emitter.startArray(), emitter.nextLine()];

    for (var i = 0; i < obj.length; i++) {
      result.push(emitter.indent(indentLevel + 1));

      result.push(serialize(obj[i], indentLevel + 1));

      if (i < obj.length - 1) {
        result.push(emitter.endItem());
      } else {
        result.push(emitter.nextLine());
      }
    }

    result.push(emitter.indent(indentLevel));
    result.push(emitter.endArray());

    return result.join('');
  };

  var serializeAnObject = function (obj, indentLevel) {
    var result = [emitter.startObject(), emitter.nextLine()];

    var keys = Object.keys(obj);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      result.push(emitter.indent(indentLevel + 1));

      result.push(emitter.objectKey(key));
      result.push(emitter.symbol(':'));
      result.push(' ');
      result.push(serialize(obj[key], indentLevel + 1));

      if (i < keys.length - 1) {
        result.push(emitter.endItem());
      } else {
        result.push(emitter.nextLine());
      }
    }

    result.push(emitter.indent(indentLevel));
    result.push(emitter.endObject());

    return result.join('');
  };

  var serializeObject = function (obj, indentLevel) {
    if (Array.isArray(obj)) {
      return serializeArrayLike(obj, indentLevel);
    } else if (obj) {
      return serializeAnObject(obj, indentLevel);
    } else {
      return emitter.aNull();
    }
  };

  var serialize = function (obj, indentLevel) {
    if (typeof (indentLevel) === 'undefined') {
      indentLevel = 0;
    } else if (indentLevel >= maxIndentLevel) {
      return '...';
    }

    if (typeof (obj) === 'boolean') {
      return emitter.aBoolean(obj);
    }

    if (typeof (obj) === 'number') {
      return emitter.aNumber(obj);
    }

    if (typeof (obj) === 'string') {
      return emitter.aString(obj);
    }

    if (typeof (obj) === 'symbol') {
      return emitter.aSymbol(obj);
    }

    if (typeof (obj) === 'function') {
      return emitter.aFunction(obj);
    }

    if (typeof (obj) === 'object') {
      return serializeObject(obj, indentLevel);
    }
  };

  return serialize;
};

module.exports = getSerializer;