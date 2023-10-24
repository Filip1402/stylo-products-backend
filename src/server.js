const express = require("express")
require("dotenv").config()

const server = express()
const port = 3001;

server.get("/", (req, res) => {
    res.json({message: "Hello this is products microservice!"})
})

server.listen(port, () => {
    console.log("Server listening on port " + port)
})