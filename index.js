const api = require("./api/app")
const port = process.env.PORT


api.listen(port,() => {
    console.log(`API listening on ${port}`)
    })