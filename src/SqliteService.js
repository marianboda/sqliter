import { Promise } from 'bluebird'
import Sqlite from 'sqlite3'

const db = new Sqlite.Database('./db.sqlite')
const all = Promise.promisify(db.all, {context: db})

const SQLService = {
  getTables: () => {
    const tables = all('SELECT * FROM sqlite_master WHERE type="table"')
    return Promise.all(Promise.map(tables, (t) => {
      return all(`PRAGMA table_info(${t.name})`).then((ts, idx) => {
        const result = {name: t.name, fields: ts.map(i => i.name)}
        return result
      })
    })
    )
  },
  getRecords: (table) => {
    return all(`SELECT * FROM ${table} LIMIT 10`)
  }
}

export default SQLService
