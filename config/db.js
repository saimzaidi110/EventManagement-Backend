const mongoose = require("mongoose");

const ConnectDB= async()=>{

await mongoose.connect(process.env.DBURI)
  .then(() => console.log('Connected!'))
  .catch(() => console.log('Not Connected!'))
}

module.exports=ConnectDB