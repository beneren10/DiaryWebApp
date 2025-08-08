const express = require('express');
const path = require('path');
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

app.get('/health', (req, res) => res.send('OK'));
app.get('/port', (req,res) => res.send(process.env.PORT))
app.get('/route', (req,res) => res.send(__dirname))

// Serve all static files under /assets path
app.use('/assets', express.static(path.join(__dirname, 'client', 'pages', 'assets')));

// Serve all HTML files in /client/pages as static files
app.use(express.static(path.join(__dirname, 'client', 'pages')));

// On root, send index.html or register.html as you prefer
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'pages', 'register.html'));
});

module.exports = app;

