const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
//express being used as the local server
app.use(express.json())

const users = []
//getting the pushed information from localhost:3000/users
app.get('/users', (req, res) => {
    res.json(users);
})
//posting name and password information to the server
app.post('/users', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        console.log(hashedPassword);
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user);
        res.status(201).send();
    }catch{
        res.status(500);
    }
    
})

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name)
    if (user == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if(await bycrypt.compare(req.body.password, user.passord)){
            res.send('Success')
        }else {
            res.send('Not allowed')
        }
    } catch {
        res.status(500).send()
    }
})
app.listen(3000)