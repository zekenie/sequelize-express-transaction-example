const express = require('express')
const db = require('./db')
const app = express()

app.use(require('./transaction-middleware')({ sequelize: db }))

app.get('/', async (req, res, next) => {
  try {
    await db.model('task').update({ latest: false }, { where: {} })
    const newTask = await db.model('task').create({ latest: true })
    res.json(newTask)
  } catch(e) {
    next(e)
  }
})

app.listen(9000);