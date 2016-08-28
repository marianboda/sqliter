import { Promise } from 'bluebird'
import Sqlite from 'sqlite3'

const db = new Sqlite.Database('./db.sqlite')
const all = Promise.promisify(db.all, {context: db})

const SQLService = {
  getTables: () => {
    const tables = all('SELECT * FROM sqlite_master WHERE type="table"')
    return Promise.all(Promise.map(tables, (t) => {
      console.log(t)
      all(`PRAGMA table_info(${t.name})`).then((ts, idx) => {
        // const result = ts.map((i,idx) => ({idx: idx, table: t.name, fields: i}))
        const result = {name: t.name, fields: ts.map(i => i.name)}
        console.log(result)
        return result
      })
    })
    )
  },

}

export default SQLService
