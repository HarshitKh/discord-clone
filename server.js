const express = require("express");
const fs = require("fs");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

// Load Data
let chatData = JSON.parse(fs.readFileSync("chat.json", "utf8"));
let accounts = JSON.parse(fs.readFileSync("accounts.json", "utf8"));
let groups = JSON.parse(fs.readFileSync("data/data.json", "utf8")).groups || ["Common Group"];

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("A user connected!");

    // Handle User Registration
    socket.on("register", (userData) => {
        if (!accounts[userData.username]) {
            accounts[userData.username] = {
                nickname: userData.nickname,
                profilePic: userData.profilePic,
                groups: ["Common Group"]
            };
            fs.writeFileSync("accounts.json", JSON.stringify(accounts, null, 2));
            socket.emit("registrationSuccess", accounts[userData.username]);
        } else {
            socket.emit("registrationError", "Username already exists!");
        }
    });

    // Handle Group Joining
    socket.on("joinGroup", (group, username) => {
        if (!groups.includes(group)) {
            groups.push(group);
            fs.writeFileSync("data/data.json", JSON.stringify({ groups }, null, 2));
        }

        if (!accounts[username].groups.includes(group)) {
            accounts[username].groups.push(group);
            fs.writeFileSync("accounts.json", JSON.stringify(accounts, null, 2));
        }

        socket.join(group);
        socket.emit("groupJoined", group);
    });

    // Handle Sending Messages
    socket.on("sendMessage", (data) => {
        chatData.push(data);
        fs.writeFileSync("chat.json", JSON.stringify(chatData, null, 2));
        io.to(data.group).emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected!");
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
