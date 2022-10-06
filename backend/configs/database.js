const mongoose = require('mongoose');

const uri = "mongodb+srv://atx:Aa12345@cluster0.pnsnwj2.mongodb.net/?retryWrites=true&w=majority"
// mongodb+srv://lironfeldman:dCBdvd3eMAiLojje@cluster0.pnsnwj2.mongodb.net/test

mongoose.connect(uri).then(resp=>console.log('connected'))
