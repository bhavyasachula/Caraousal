const PostgresConn = require("./databasePg")

module.exports = async function connection() {

 PostgresConn.connect().then(()=>{
    console.log("database Connected");
})
}