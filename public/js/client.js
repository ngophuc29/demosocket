const inputname = document.getElementById("name")
const inputroom = document.getElementById("room")
const btn_join = document.getElementById("btn_join")

const inputmessage = document.getElementById("message")
const btn_send = document.getElementById("btn_send")
const ul_message=document.getElementById("ul_message")
const socket = io.connect()

socket.on("connect", (data) => {
    console.log(data)
})
btn_join.addEventListener("click", () => {
    const name = inputname.value
    const room = inputroom.value
    socket.emit("join", room)
})

btn_send.addEventListener("click", () => { 
    const message = inputmessage.value
    const name = inputname.value

    socket.emit("message", name+" : "+ message)
})

socket.on("thread", (data) => { 
    console.log(data)
    const li = document.createElement("li")
    li.innerHTML = data
    ul_message.appendChild(li)
})