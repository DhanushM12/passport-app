const express = require('express');
const app = express();
const port = 8000;
const passport = require('passport');


app.listen(port, function(err){
    if(err){
        console.log(`Error i running the server : ${err}`);
    }
    console.log(`Server is up and running on port : ${port}`)
})