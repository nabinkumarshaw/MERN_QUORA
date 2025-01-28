const mongoose =require('mongoose')
const dotenv =require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_URL)

db= mongoose.connection


db.once("open",()=>{
    console.log("connected to database")
})

db.on("error",()=>{
    console.log("error connecting to database")
})

module.exports=db