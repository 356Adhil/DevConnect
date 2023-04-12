const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const port = 4000;
const http = require("http");
const cors = require("cors");
const userRoutes = require("./routes/user/userRoutes.js");
const adminRoutes = require("./routes/admin/adminRoutes");
require("dotenv").config();
const { Server } = require("socket.io");
const db = require('./config/db');
// const { default: mongoose } = require("mongoose");

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://devconnect.cloud",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected",socket.id);

  socket.on("join_room", (data) => {
    socket.join(data)
    console.log(`User with id: ${socket.id} joined room: ${data}`)
  })

  socket.on("send_message",(data)=>{
    console.log(data)
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

// mongoose.connect(process.env.DB_CONNECT, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


db(()=>{
  try {
      console.log('Database successfully connected')
  } catch (error) {
      console.log('Database not connected',error)
      
  }
})

// Modify this line to use a middleware function
app.use("/", userRoutes.router);
app.use(adminRoutes);

server.listen(port, () => console.log(`app listening on port ${port}!`));
