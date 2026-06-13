const express = require("express")
const cors = require("cors")
const app = express()
const PostgresConn = require("./config/databasePg")
const connection = require("./config/dbconnection")

app.use(express.json())
app.use(cors())

connection()

app.get("/",(req,res)=>{
    return res.send("server is running")
 })


app.post("/upload",async(req,res)=>{
    const {url} = req.body
    const result = await PostgresConn.query('SELECT MAX(id) as maxid FROM "sliderUrl" ');
    const nextid = Number(result.rows[0].maxid) + 1
    const response = await PostgresConn.query('INSERT into "sliderUrl"(id,url) values($1,$2)',[nextid,url]);
    res.send("saved")
})

app.get("/fetchUrl",async (req,res)=>{
    const result = await PostgresConn.query('SELECT * from "sliderUrl" ')

    //First way to loop throught the data
    // for(let i=0 ; i<result.rows.length;i++){
    //      res.send(result.rows[i].url)
    // }

    //Second way to loop through the data
    const urls = result.rows.map(row => row.url) ;
    res.json(urls)
})

app.listen("2000",()=>{
    console.log("server running at 'http://localhost:2000'");
    
})
