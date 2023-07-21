const express = require('express');
const urlRoute = require('./routes/url');
const {cooncetToMongoDB}  = require('./conn');
const URL = require('./models/urls');
const app = express();
const PORT = 4000 ;

cooncetToMongoDB('mongodb://localhost:27017/short-url').then(() =>{
    console.log(`MongoDB Connected `);
})

app.use(express.json())
app.use('/url' , urlRoute);

app.get('/:shortId',async (req,res) =>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory: {
            timestamp: Date.now(),
        }
    }})
    res.redirect(entry.redirectUrl);
})

app.listen(PORT, () =>{
    console.log(`Server Running at Port No. ${PORT}`)
})
