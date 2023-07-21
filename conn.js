const mongoose = require('mongoose');

async function cooncetToMongoDB(url){
    return mongoose.connect(url)
}

module.exports ={
    cooncetToMongoDB,
}
