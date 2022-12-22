const { json } = require("body-parser");
const { application } = require("express");
const express = require("express");

//abbility to make routes
const Router = express.Router();

const Games = require("../models/gameModels")

//collection GET
Router.get('/', async (req, res) => {
console.log('GET')
    if (req.header('Accept') != "application/json") {
        res.status(415).send();

    }

    try {
        let games = await Games.find();
        console.log("getting it")

        //create representation for collection as requested in assignment
        //items, _links, pagination

        let gamesCollection = {
            items: games,
            _links: {
                self: {
                    href: `${process.env.BASE_URI}games/`
                },
                collection: {
                    href: `${process.env.BASE_URI}games/`
                }
            },
            pagination: "open voor later",


        }
        res.json(gamesCollection);
    }
    catch {
        res.status(500).send();

    }
})

//detail get
Router.get("/:Id", async (req, res) => {
    try {
        const game = await Games.findById(req.params.Id);
        // console.log(game);
        res.json(game);
    }
    catch {
        res.status(500);
    }
})
//add middleware to check content-type
Router.post("/", async (req, res, next) => {
    console.log("checking conten-type post")
    if(req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded"){
        res.status(400).send();
    } else{
        next();
    }
})


// add middleware to disallow empty values
Router.post("/", async (req, res, next) => {
    console.log("checking empty values post")
    if(req.body.title && req.body.ingredients && req.body.sauce){
        next();
    } else{
        res.status(400).send();
    }
})


//post resource
Router.post('/', async (req, res) => {
    let game = new Games({
        title: req.body.title,
        genre: req.body.genre,
        releaseDate: req.body.releaseDate,

    })
    try {
        console.log(game);
        await game.save();
        res.status(201).send();
        res.json(game);
    }
    catch {
        res.status(500).send();
    }

    console.log("posting it")
})

Router.delete('/:Id', async (req, res) => {
    try {
        const removeGame = await Games.remove({ _Id: req.params.Id });
        res.json(removeGame);
        console.log("deleting it")
    } catch {
        res.status(500).send();

    }

    console.log("deleting it")
})

//middleware to check content type
Router.put("/:_Id", async (req, res, next) => {
    console.log("checking content-type put")
    if(req.header("Content-Type") != "application/json" && req.header("Content-Type") != "application/x-www-form-urlencoded"){
        res.status(400).send();
    } else{
        next();
    }
})

//middleware to check empty vallues
Router.put("/:_Id", async (req, res, next) => {
    console.log("checking empty values put")
    if(req.body.title && req.body.ingredients && req.body.sauce){
        next();
    } else{
        res.status(400).send();
    }
})


Router.put("/:_Id", async (req, res) => {

    let game = await Game.findOneAndUpdate(req.params,
        {
            title: req.body.title,
            genre: req.body.genre,
            releaseDate: req.body.releaseDate
        })

    try {
        game.save();

        res.status(203).send();
    } catch {
        res.status(500).send();
    }
})

//options route 
Router.options("/", (req, res) => {
    res.setHeader("Allow", "GET, POST, OPTIONS");
    res.send();
})

// options route for detail
Router.options("/:Id", async (req, res) => {
    res.set({
        'Allow': 'GET, PUT, DELETE, OPTIONS'
    }).send()
})

module.exports = Router;
