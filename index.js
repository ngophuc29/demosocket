const express = require('express')

const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.json())
app.use(express.static("public"))
app.set('view engine', 'ejs')
app.set("views",'views')
io.on('connection', (client) => { 
    console.log('a user connected')

    var room;
    client.on('join', (data) => {
        room = data;
        client.join(room);
        
    });

    client.on("message", (data) => {
        io.to(room).emit("thread",data)
    })
})

app.get('/chat', (req, res) => { 
    return res.render('chat.ejs')
})
server.listen(5000, (req, res) => {
    console.log('Server is running on port 5000')
})