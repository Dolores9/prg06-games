const express = require ('express');

const app = express ();

// Import the mongoose module
const mongoose = require("mongoose");

// Set up default mongoose connection
const mongoDB = "mongodb://127.0.0.1/gamesnp";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));


const gamesRoutes = require("./routes/gameRoutes");

app.use('/', gamesRoutes );

app.listen(8000, () => {
   console.log("its starting")
});



