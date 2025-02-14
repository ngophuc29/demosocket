const inputname = document.getElementById("name")
const inputroom = document.getElementById("room")
const btn_join = document.getElementById("btn_join")

const inputmessage = document.getElementById("message")
const btn_send = document.getElementById("btn_send")
const ul_message=document.getElementById("ul_message")
const socket = io.connect()


let myname=""

socket.on("connect", (data) => {
    console.log(data)
})
btn_join.addEventListener("click", () => {
    myname = inputname.value
    const room = inputroom.value
    socket.emit("join", room)
    alert("Join room " + room)
})

const sendMessage = () => {
    const message = inputmessage.value
    if (message === "") {
        return
    }

    const obj = {
        name: myname,
        message: message
    }

    socket.emit("message", JSON.stringify(obj))
    inputmessage.value = ""
    inputmessage.focus()
}
btn_send.addEventListener("click", sendMessage)
inputmessage.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        sendMessage()
    }
})
socket.on("thread", (data) => { 

    const obj=JSON.parse(data)
    console.log(data)
    const li = document.createElement("li")
    li.innerHTML = obj.message

    if (obj.name === myname) { 
        li.classList.add("right")
    }

    ul_message.appendChild(li)
})