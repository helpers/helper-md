## Register the helper

> This should work with any engine, here are a few examples

### [templates](https://github.com/jonschlinkert/templates)

Register the helper for use with any template engine

```js
template.helper('md', require('helper-md'));
```

### [assemble](https://github.com/assemble/assemble)

To register the helper for use with [assemble](https://github.com/assemble/assemble) v0.6.x:

```js
assemble.helper('md', require('helper-md'));
```

### [verb](https://github.com/verbose/verb)

Register the helper for use with [verb](https://github.com/verbose/verb):

```js
var verb = require('verb');
verb.helper('md', require('helper-md'));
```

### [handlebars](http://www.handlebarsjs.com/)

```js
var handlebars = require('handlebars');
handlebars.registerHelper('md', require('helper-md'));
```

### lodash

Should work the same with [Lo-Dash](https://lodash.com/) or [underscore](http://underscorejs.org):

```js
var md = require('helper-md');

// as a mixin
_.mixin({md: md});
_.template('<%= _.md("posts/foo.md") %>', {});
//=> '<h1>heading</h1>\n'

// passed on the context
_.template('<%= md("posts/foo.md") %>', {md: md});
//=> '<h1>heading</h1>\n'

// as an import
var settings = {imports: {md: md}};
_.template('<%= md("posts/foo.md") %>', {}, settings);
//=> '<h1>heading</h1>\n'
```