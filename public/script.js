const socket = io();

function register() {
    let username = document.getElementById("username").value;
    let nickname = document.getElementById("nickname").value;
    let profilePic = document.getElementById("profilePic").value;

    if (!username || !nickname) {
        alert("Username and Nickname required!");
        return;
    }

    socket.emit("register", { username, nickname, profilePic });
}

socket.on("registrationSuccess", (user) => {
    document.getElementById("login").style.display = "none";
    document.getElementById("chat").style.display = "block";
});

socket.on("registrationError", (msg) => {
    alert(msg);
});

function joinGroup() {
    let group = prompt("Enter group name:");
    let username = document.getElementById("username").value;
    
    if (group) {
        socket.emit("joinGroup", group, username);
    }
}

function sendMessage() {
    let message = document.getElementById("messageInput").value;
    let group = document.getElementById("groupSelect").value;
    
    if (message) {
        socket.emit("sendMessage", { group, message });
    }
}

socket.on("receiveMessage", (data) => {
    let msgList = document.getElementById("messages");
    let msgItem = document.createElement("li");
    msgItem.textContent = `${data.message}`;
    msgList.appendChild(msgItem);
});
