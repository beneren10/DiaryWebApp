const express = require('express');
const cors = require("cors")

const logRouters = require('./middleware/logger')

const diaryRouter = require('./routers/diary');
const userRouter = require('./routers/user')


const app = express()

app.use(express.json());
app.use(cors())
app.use(logRouters)

app.use("/diary", diaryRouter)
app.use("/users", userRouter);


app.get("/", (req, res) => {
  res.status(200).json({
    title: "Bridget Jones's Diary!",
    description: "Do you love the sound of your own voice? Do you feel that you have something to share that you don't want anyone else to see?"
  })
})

const db = require('./db'); // your DB connection

app.get('/health', async (req, res) => {
  try {
    // test DB connection
    await db.raw('SELECT * FROM diary;'); // for Knex + PostgreSQL
    res.status(200).json({ status: 'ok', db: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'fail', db: 'disconnected', error: err.message });
  }
});


module.exports = app;