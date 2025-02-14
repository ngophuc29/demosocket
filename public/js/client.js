// const inputname = document.getElementById("name")
const inputroom = document.getElementById("room")
const btn_join = document.getElementById("btn_join")

const inputmessage = document.getElementById("message")
const btn_send = document.getElementById("btn_send")
const ul_message = document.getElementById("ul_message")
const socket = io.connect()


let myname = localStorage.getItem("username")

socket.on("connect", (data) => {
    console.log(data)
})
btn_join.addEventListener("click", () => {
    // myname = inputname.value
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

    const obj = JSON.parse(data)
    console.log(data)
    const li = document.createElement("li")
    li.innerHTML =
        
    `
    <span>${obj.message}</span>
    <div class="">
        <i class="choose_emotion fa-regular fa-face-smile"></i>

    </div>
        `
        
        // obj.message

    if (obj.name === myname) {
        li.classList.add("right")
    }

    ul_message.appendChild(li)
    ul_message.scrollTop = ul_message.scrollHeight // tu dong cuon den tin nhan moi
    loadChooseEmotion()
})


function loadChooseEmotion(){ 

    const choose_emotion = document.getElementsByClassName("choose_emotion")
    for (let ce of choose_emotion) {
        ce.addEventListener("click", (e) => {
            if (e.target.classList.contains("choose_emotion")) {
                if (e.target.innerHTML.toString().trim().length === 0) {

                    e.target.innerHTML = `
                            <div class="emotion">
                                <i class="fa-solid fa-heart"></i>
                                <i class="fa-solid fa-face-laugh-wink"></i>
                                <i class="fa-regular fa-face-surprise"></i>
                                <i class="fa-regular fa-face-rolling-eyes"></i>
                                <i class="fa-solid fa-face-angry"></i>
                            </div>`
                }
                else {
                    e.target.innerHTML = ""
                }
            }
        })
    }
}
loadChooseEmotion()