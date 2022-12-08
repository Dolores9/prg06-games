const express = require("express");

const Router = express.Router();

const Games = require("../models/gameModels")

//collection GET
Router.get('/', async (req, res) => {

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

Router.delete('/', (req, res) => {
    res.send("delete");
    console.log("deleting it")
})

Router.options('/', (req, res) => {
    res.send("options");
    console.log("options girl")
})

module.exports = Router;
