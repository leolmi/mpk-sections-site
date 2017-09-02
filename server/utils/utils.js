'use strict';
const _ = require('lodash');

function _schema(o) {
  return _.keys(o).join('.');
}

var cache = function(max) {
  var self = this;
  self.maxLevel = max||20;
  self.items = [];
  self.inc = function(key) {
    self.level++;
    self.items.push(key);
    return self;
  };
  self.valid = function(key) {
    return (self.items.indexOf(key)<0);
  };
};

function _getstrings(o, max, c, l) {
  function _key(ko, pn) {
    return (ko&&pn) ? pn+'_'+_schema(ko) : null;
  }
  c = c||new cache(max);
  l = l||0;
  var u = {};
  if (l<c.maxLevel) {
    _.keys(o).forEach(function (pn) {
      if (!_.isObject(o[pn])) u[pn] = JSON.stringify(o[pn]);
      if (_.isObject(o[pn])) {
        var key = _key(o, pn);
        u[pn] = c.valid(key) ? _getstrings(o[pn], max, c.inc(key), l) : u[pn] = '<<<<<<<<<< JUST DONE';
      }
    });
  } else {
    u['__________'] = '<<<<<<<<<< LEVEL LIMIT';
  }
  return u;
}

/**
 * @param {*} o
 * @param {number} [max]
 */
exports.stringify = function(o, max) {
  return JSON.stringify(_getstrings(o, max), null, 2);
};
