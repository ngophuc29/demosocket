// const inputname = document.getElementById("name")
const inputroom = document.getElementById("room")
const btn_join = document.getElementById("btn_join")

const inputmessage = document.getElementById("message")
const btn_send = document.getElementById("btn_send")
const ul_message = document.getElementById("ul_message")
const socket = io.connect()


let myname = localStorage.getItem("username")

const emotions = [
    {
        id: 1,
        emotion: `<i  class="fa-solid fa-heart"></i>`
    },
    {
        id: 2,
        emotion: `<i  class="fa-solid fa-face-laugh-wink"></i>`
    },
    {
        id: 3,
        emotion: `<i  class="fa-regular fa-face-surprise"></i>`
    },
    {
        id: 4,
        emotion: `<i  class="fa-regular fa-face-rolling-eyes"></i>`
    },
    {
        id: 5,
        emotion: `<i  class="fa-solid fa-face-angry"></i>`
    }
];

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

    let id = ''
    for (let i = 0; i < 8; i++) {
        id += Math.floor(Math.random() * 10)
    }
    const obj = {
        id: +id,
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
            <span id="${obj.id}"> 
                <p>${obj.message}</p>

            </span>
            <div class="">
                <i onclick="show(event ,${obj.id})" class="choose_emotion fa-regular fa-face-smile"></i>

            </div>
        `

    // obj.message

    if (obj.name === myname) {
        li.classList.add("right")
    }

    ul_message.appendChild(li)
    ul_message.scrollTop = ul_message.scrollHeight // tu dong cuon den tin nhan moi

})

function show(e,id) {
    if (e.target.classList.contains("choose_emotion")) {
        if (e.target.innerHTML.toString().trim().length === 0) {

            e.target.innerHTML = `
                            <div class="emotion">
                            <i onclick="choose(event,${id},1)" class="fa-solid fa-heart"></i>
                                <i onclick="choose(event,${id},2)" class="fa-solid fa-face-laugh-wink"></i>
                                <i onclick="choose(event,${id},3)" class="fa-regular fa-face-surprise"></i>
                                <i onclick="choose(event,${id},4)" class="fa-regular fa-face-rolling-eyes"></i>
                                <i onclick="choose(event,${id},5)" class="fa-solid fa-face-angry"></i>
                            </div>`
        }
        else {
            e.target.innerHTML = ""
        }
    }
}

function choose(e, id,id_emotion) {
    const span_message = document.getElementById(id);

    if (!span_message) {
        console.error("Không tìm thấy phần tử với id:", id);
        return;
    }

    // Đặt vị trí tương đối để giữ nguyên layout của thẻ chứa
    span_message.style.position = "relative";

    // Clone phần tử `emotion` để không xóa nó khỏi vị trí ban đầu
    const emotion = e.target.cloneNode(true);

    // Thiết lập vị trí và style cho emotion
    emotion.style.position = "absolute";
    emotion.style.bottom = "-7px";
    emotion.style.right = "4px";
    emotion.style.backgroundColor = "blue";
    emotion.style.borderRadius = "10px";
    emotion.style.padding = "3px";

    // Thêm vào `span_message`
    span_message.appendChild(emotion);

    const obj = {
        id: id,
        emotion: id_emotion
    }
    socket.emit("emotion",JSON.stringify(obj))
}

socket.on("emotion", (data) => { 
    // console.log(data);
    const obj = JSON.parse(data)
    const span_message = document.getElementById(obj.id);

    if (!span_message) {
        console.error("Không tìm thấy phần tử với id:", id);
        return;
    }

    // Đặt vị trí tương đối để giữ nguyên layout của thẻ chứa
    span_message.style.position = "relative";

    // Clone phần tử `emotion` để không xóa nó khỏi vị trí ban đầu
    let emotion = emotions[obj.emotion-1].emotion

    const div = document.createElement("div")
    div.innerHTML = emotion
    emotion = div.firstChild
    // Thiết lập vị trí và style cho emotion
    emotion.style.position = "absolute";
    emotion.style.bottom = "-7px";
    emotion.style.right = "4px";
    emotion.style.backgroundColor = "blue";
    emotion.style.borderRadius = "10px";
    emotion.style.padding = "3px";

    // Thêm vào `span_message`
    span_message.appendChild(emotion);
    
})
// function loadChooseEmotion(){

//     const choose_emotion = document.getElementsByClassName("choose_emotion")
//     for (let ce of choose_emotion) {
//         ce.addEventListener("click", (e) => {
//             if (e.target.classList.contains("choose_emotion")) {
//                 if (e.target.innerHTML.toString().trim().length === 0) {

//                     e.target.innerHTML = `
//                             <div class="emotion">
//                                 <i class="fa-solid fa-heart"></i>
//                                 <i class="fa-solid fa-face-laugh-wink"></i>
//                                 <i class="fa-regular fa-face-surprise"></i>
//                                 <i class="fa-regular fa-face-rolling-eyes"></i>
//                                 <i class="fa-solid fa-face-angry"></i>
//                             </div>`
//                 }
//                 else {
//                     e.target.innerHTML = ""
//                 }
//             }
//         })
//     }
// }
// loadChooseEmotion()