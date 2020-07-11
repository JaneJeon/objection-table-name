const TableNamer = require('../')

function getTableNameFromClass(cls) {
  return cls.tableName
}

function upperFirst([c, ...rest]) {
  return [c.toUpperCase(), ...rest].join('')
}

function overrideClassName(cls, name) {
  Object.defineProperty(cls, 'name', { value: name })
}

;[1, 2].forEach(version => {
  const { Model } = require(`objection-${version}`)

  describe(`objection-table-name (w/ objection v${version})`, () => {
    describe('when using defaults', () => {
      it("should resolve 'tablename' with camelCase and plural", () => {
        class BaseModel extends TableNamer()(Model) {}
        const testClass = {
          Foo: 'foos',
          FooBar: 'fooBars',
          fooBar: 'fooBars',
          Person: 'people'
        }
        class TestModel extends BaseModel {}
        Object.entries(testClass).forEach(([className, tableName]) => {
          overrideClassName(TestModel, className)
          expect(getTableNameFromClass(TestModel)).toStrictEqual(tableName)
        })
      })
    })

    describe('when using customs', () => {
      it("should resolve 'tableName'", () => {
        const mock = jest.fn(className => upperFirst(className))
        class BaseModel extends TableNamer({
          caseMapper: mock
        })(Model) {}
        const testClass = {
          foo_bar: 'Foo_bar',
          fooBar: 'FooBar'
        }
        class TestModel extends BaseModel {}
        Object.entries(testClass).forEach(([className, tableName]) => {
          overrideClassName(TestModel, className)
          expect(getTableNameFromClass(TestModel)).toStrictEqual(tableName)
          expect(mock).toHaveBeenCalledWith(className)
        })
      })
    })
  })
})
