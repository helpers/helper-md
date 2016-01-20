/*!
 * helper-markdown <https://github.com/jonschlinkert/helper-markdown>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var Remarkable = require('remarkable');
var extend = require('extend-shallow');

/**
 * Expose `md` helper
 */

module.exports = function md(name, opts) {
  opts = extend({sep: '\n', cwd: process.cwd()}, opts);
  extend(opts, opts.hash);

  // Support for Assemble, Verb and Template
  if (this && this.app && typeof this.app.findPartial === 'function') {
    extend(opts, this.options.remarkable);

    try {
      var template = this.app.findPartial(name);
      var str = template.render(opts);
      return markdown(opts).render(str);
    } catch (err) {
      return err;
    }

  // Support for handlebars, lo-dash, or any other engine
  } else {
    extend(opts, opts.data && opts.data.root);
    try {
      return read(name, opts, opts.render);
    } catch(err) {
      return err;
    }
  }
  return '';
};

/**
 * Utility function for reading files
 *
 * @param {String} `filepath`
 * @param {String} `opts`
 * @param {Function} `fn` Optionally pass a render / compile function on the options
 * @return {String}
 * @api private
 */

function read(fp, opts, fn) {
  var str = fs.readFileSync(fp, 'utf8');
  if (typeof fn === 'function') {
    str = fn(str)(opts);
  }
  return markdown(opts).render(str);
}

/**
 * Shared settings for remarkable
 *
 * @param {Object} `options`
 * @return {Object}
 * @api private
 */

function markdown(options) {
  return new Remarkable(extend({
    breaks: false,
    html: true,
    langPrefix: 'lang-',
    linkify: true,
    typographer: false,
    xhtmlOut: false
  }, options));
}
