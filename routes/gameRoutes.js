const express = require("express");

const Router = express.Router();


Router.get('/', (req , res) => {
    res.send("get");
    console.log("getting it")
})

Router.post('/', (req , res) => {
    res.send("post");
    console.log("posting it")
})

Router.delete('/', (req , res) => {
    res.send("delete");
    console.log("deleting it")
})

Router.options('/', (req , res) => {
    res.send("options");
    console.log("options girl")
})

module.exports = Router;
