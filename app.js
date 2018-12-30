const express = require('express')
const mongoose = require('mongoose') 
const User = require('./models/user')
const _ = require('lodash')

const app = express()
app.use(express.json())

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/newtest')

// const users = [{
//     id: 1,
//     name: 'ogy'
// }, {
//     id: 2,
//     name: 'chouchou'
// }]

app.get('/', (req, res) => {
    res.send('hello world')
})
app.get('/users', (req, res) => {
    User.find().then(records => {
        res.send(records)
    }, err => {
        res.status(400).send('DB internal error')
    })
})
app.get('/users-alt', async (req, res) => {// thenのが読みやすく感じるのは慣れのせい？
    try {
        const records = await User.find()
        res.send(records)
    } catch {
        res.status(400).send('internal error')
    }
})
app.post('/users', (req, res) => {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })
    user.save((err, record) => {
        if (err) {
            return res.status(400).send('DB internal error')
        }
        res.send(record)
    })
    console.log(`text is: ${req.body.text}`)
})
app.get('/users/:id', (req, res) => {
    User.find({_id: req.params.id}, (err, record) => {
        if (err) {
            return res.status(400).send('DB internal error')
        }
        res.send(record)
    })
})
app.put('/users/:id', (req, res) => {
    User.findById(req.params.id, (err, record) => {
        if (err) {
            return res.status(400).send('DB internal error')
        }
        if (!record) {
            return res.status(404).send('not found')
        }
        record.firstName = req.body.firstName
        record.save((err, record) => {
            if (err) {
                return res.status(400).send('DB internal error')
            }
            res.send(record)
        })
    })
})
app.delete('/users/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, record) => {
        if (err) {
            return res.status(400).send('DB internal error')
        }
        if (!record) {
            return res.status(404).send('not found')
        }
        res.send(record)
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000...')
})