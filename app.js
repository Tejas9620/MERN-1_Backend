const express = require('express');
const cors = require('cors')
const app = express();
const port = 4000;

const mongoose = require('mongoose');
mongoose.set("strictQuery", false)


//require database model
const User = require("./Models/users")

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors()) // Cross origin resources sharing
                //? a mechanism that allows restricted resources on a 
                //? web page to be requested from another domain outside the domain 
                //? from which the first resource was served.

const url = "mongodb://localhost:27017/foodie"
mongoose.connect(url).then(() => {
    console.log("Connection to Database");
})

app.post('/signUp', (req, res) => {
    User.findOne({ email: req.body.email }, async(err, userData) => {
        if (userData) {
            res.send({message:"User Already Exists"})
        }
        else {
            const data = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password:req.body.password                
            })
            try {
                await data.save()
                res.send({message:"User registered successfully"})
                res.redirect('/')
            } catch (err) {
                res.send(err)
            }
        }
    })
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})


