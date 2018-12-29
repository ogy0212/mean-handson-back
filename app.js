const express =require('express')
const app = express()
app.use(express.json())

const users = [{
    id: 1,
    name: 'ogy'
}, {
    id: 2,
    name: 'chouchou'
}]

app.get('/', (req, res) => {
    res.send('hello world')
})
app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    res.send(user)
})
app.get('/users', (req, res) => {
    res.send(users)
})
app.post('/users', (req, res) => {
    const user = {
        id: users.length+1,
        name: req.body.name
    }
    users.push(user)
    console.log(`text is: ${req.body.text}`)
    res.send(user)
})

app.listen(3000, () => {
    console.log('listening on port 3000...')
})