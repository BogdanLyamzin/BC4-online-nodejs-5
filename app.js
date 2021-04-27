const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb");
require("dotenv").config();

const {postsApi} = require("./api");

const app = express();

app.use(cors());

app.use(express.static(`${__dirname}/public`));

app.use("/api/v1/posts", postsApi);

app.use((_, res, _)=>{
    res.status(404).json({
        status: "errror",
        code: 404,
        message: "Page not found"
    })
})

let dbClient = null;

const {DB_HOST, PORT} = process.env;

new MongoClient(DB_HOST, {
    useUnifiedTopology: true
}).connect((err, database)=> {
    if(err){
        return console.log(err)
    }
    const port = PORT || 3000;

    app.listen(port);
    dbClient = database;

})

app.get("/users", (req, res, next)=> {
    dbClient.collection("users").find({name: "Alex"}).toArray((err, results)=> {
         console.log(results)
    })

    dbClient.collection("users").updateOne({name: "Alex"}).then((err, results)=> {
     console.log(results)
    })
})