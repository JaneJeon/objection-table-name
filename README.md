# objection-table-name

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
