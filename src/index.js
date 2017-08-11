import express from 'express'
import db from './SqliteService'
import path from 'path'

const app = express()

app.use(express.static('static'))

app.get('/api/tables', (req, res) => {
  db.getTables()
    .then((tables) => res.status(200).send(JSON.stringify(tables)))
})

app.get('/api/records/:table', (req, res) => {
  db.getRecords(req.params['table'], req.query)
    .then((tables) => res.status(200).send(JSON.stringify(tables)))
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'static', 'index.html'))
})

app.listen(3010, () => {
  console.log('Api running')
})
