# objection-table-name

[![CircleCI](https://img.shields.io/circleci/build/github/JaneJeon/objection-table-name)](https://circleci.com/gh/JaneJeon/objection-table-name) [![Maintainability](https://api.codeclimate.com/v1/badges/909f04aee0f1137ac368/maintainability)](https://codeclimate.com/github/JaneJeon/objection-table-name/maintainability) [![npm](https://img.shields.io/npm/v/objection-table-name)](https://www.npmjs.com/package/objection-table-name) [![npm](https://img.shields.io/npm/dt/objection-table-name)](https://www.npmjs.com/package/objection-table-name) [![David](https://img.shields.io/david/JaneJeon/objection-table-name)](https://david-dm.org/JaneJeon/objection-table-name) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=JaneJeon/objection-table-name)](https://dependabot.com) [![License](https://img.shields.io/npm/l/objection-table-name)](https://github.com/JaneJeon/objection-table-name/blob/master/LICENSE)

## What To Solve

```js
class NodeModule extends Model {
  static get tableName() {
    return "nodeModules" // you type it on every model
  }
}
```

what about:

```js
class NodeModule extends Model {}
console.log(NodeModule.tableName)
// => nodeModules
```

## Installation

`$ npm install objection-table-name`

## Usage

```js
const { Model } = require("objection")
const tableName = require("objection-table-name")

// The common way is:
// - make this is as your base class

// BaseModel.js
class BaseModel extends tableName()(Model) {}

// TransactionDetail.js
class TransactionDetail extends BaseModel {}
console.log(TransactionDetail.tableName)
// => transactionDetails
```

You can define your own mapper

```js
function upperFirst([s, ...rest]) {
  return [s.toUpperCase(), ...rest].join("")
}

class BaseModel extends TableNamer({
  caseMapper: upperFirst
})(Model) {}

class foo_Bar extends BaseModel {}
console.log(foo_Bar.tableName)
// => Foo_Bar
```

[Lodash](https://lodash.com/docs/) provides some already defined caseMappers. You can use it too.

## License

MIT
