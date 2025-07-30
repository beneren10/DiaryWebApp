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



module.exports = app;