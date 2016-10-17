import { Promise } from 'bluebird'
import Sqlite from 'sqlite3'

const db = new Sqlite.Database('./db.sqlite')
const all = Promise.promisify(db.all, {context: db})

const SQLService = {
  getTables: () => {
    const tables = all('SELECT * FROM sqlite_master WHERE type="table"')
    return Promise.all(Promise.map(tables, (t) => {
      const countPromise = all(`SELECT COUNT(*) as c FROM ${t.name}`).then(i => i[0].c)
      const fieldsPromise = all(`PRAGMA table_info(${t.name})`)
      return Promise.all([countPromise, fieldsPromise])
        .then(([rowCount, fields]) => {
          return {
            name: t.name,
            rowCount,
            fields: fields.map(i => i.name),
            pk: fields.filter(i => i.pk == 1).map(i => i.name)
          }
        })
    }))
  },

  getRecords: (table, query) => {
    const limit = (query.count) ? +query.count : 10000
    const offset = (query.offset) ? +query.offset : 0
    const order = 'rowid'

    return all(`SELECT rowid, * FROM ${table} ORDER BY ${order} LIMIT ${limit} OFFSET ${offset}`)
  }
}

export default SQLService
