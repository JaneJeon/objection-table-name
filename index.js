const memoize = require("lodash/memoize")
const camelCase = require("lodash/camelCase")
const { plural } = require("pluralize")

const pluralCamelMemoized = memoize(str => plural(camelCase(str)))

/**
 * @param {Object} options:
 * @param {Function} options.caseMapper
 */
function tableNamer({ caseMapper = pluralCamelMemoized } = {}) {
  return Model =>
    class extends Model {
      static get tableName() {
        return caseMapper(this.name)
      }
    }
}

module.exports = tableNamer
