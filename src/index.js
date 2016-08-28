import db from './SqliteService'

db.getTables()
  .then((d) => console.log('done'))
