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

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'register.html'));
});


module.exports = app;