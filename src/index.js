import express from 'express'
import db from './SqliteService'

const app = express()

app.get('/tables', (req, res) => {
  db.getTables()
    .then((tables) => res.status(200).send(JSON.stringify(tables)))
})

app.listen(3000, () => {
  console.log('Api running')
})
