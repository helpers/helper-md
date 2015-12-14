/*!
* helper-md <https://github.com/jonschlinkert/helper-md>
*
* Copyright (c) 2014 Jon Schlinkert, contributors.
* Licensed under the MIT License
*/

'use strict';

var should = require('should');
var handlebars = require('handlebars');
var _ = require('lodash');
var md = require('..');

var Template = require('template');
var template;


describe('md helper', function () {
  beforeEach(function() {
    template = new Template();
    template.helper('md', md);

    template.create('include', {isPartial: true});
    template.include('one', {content: '# heading <%= name %>', name: 'one'});
    template.partial('two', {content: '# heading <%= name %>', name: 'two'});

    template.page('home.md', {
      content: '<%= md("one") %>'
    });
  });

  it('should render markdown on the `content` property for the specified template:', function (cb) {
    template.render('home.md', function(err, content) {
      content.should.equal('<h1>heading one</h1>\n');
      cb();
    });
  });

  it('should support rendering markdown from a file:', function () {
    md('test/fixtures/a.md').should.equal('<h1>AAA</h1>\n<blockquote>\n<p>this is aaa</p>\n</blockquote>\n');
  });
});

describe('handlebars:', function () {
  it('should support rendering markdown from a file:', function () {
    handlebars.registerHelper('md', md);
    handlebars.compile('{{{md "test/fixtures/a.md"}}}')().should.equal('<h1>AAA</h1>\n<blockquote>\n<p>this is aaa</p>\n</blockquote>\n');
  });

  it('should use the `render` function passed on the locals to render templates in partials :', function () {
    handlebars.registerHelper('md', md);
    var locals = {name: 'CCC', render: handlebars.compile};
    handlebars.compile('{{{md "test/fixtures/c.md"}}}')(locals).should.equal('<h1>CCC</h1>\n<p>This is CCC</p>\n');
  });
});

describe('lodash:', function () {
  it('should work as a lodash mixin:', function () {
    _.mixin({md: md});
    _.template('<%= _.md("test/fixtures/a.md") %>', {}).should.equal('<h1>AAA</h1>\n<blockquote>\n<p>this is aaa</p>\n</blockquote>\n');
  });

  it('should work when passed to lodash on the locals:', function () {
    _.template('<%= _.md("test/fixtures/a.md") %>', {md: md}).should.equal('<h1>AAA</h1>\n<blockquote>\n<p>this is aaa</p>\n</blockquote>\n');
  });

  it('should work as a lodash import:', function () {
    var settings = {imports: {md: md}};
    _.template('<%= _.md("test/fixtures/a.md") %>', {}, settings).should.equal('<h1>AAA</h1>\n<blockquote>\n<p>this is aaa</p>\n</blockquote>\n');
  });
});

describe('highlight:', function (argument) {
    var hljs = require('highlight.js');
    it('should support syntax highlighting', function () {
        md('test/fixtures/e.md', {highlight: function highlight(code, lang) {
          try {
            try {
              return hljs.highlight(lang, code).value;
            } catch (err) {
              if (!/Unknown language/i.test(err.message)) {
                throw err;
              }
              return hljs.highlightAuto(code).value;
            }
          } catch (err) {
            return code;
          }
        }
 }).should.equal('<h1>EEE</h1>\n<pre><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">message</span> = <span class="hljs-string">\'This is an alert\'</span>;\nalert(<span class="hljs-keyword">message</span>);\n</code></pre>\n');
    });
});
