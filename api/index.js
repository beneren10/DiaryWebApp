require ("dotenv").config()

const api = require("./app")
const port = 3000


api.listen(port,() => {
    console.log(`API listening on ${port}`)
    })