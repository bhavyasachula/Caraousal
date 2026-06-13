const {Client} = require("pg")

const PostgresConn = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"bhavya",
    database:"Slider"
})


module.exports = PostgresConn; 