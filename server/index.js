const express = require('express');
const { Server: SocketServer } = require('socket.io');
const http = require('http');
const cors = require('cors');
const mongoose = require("mongoose");
const fileRoutes = require('./routes/fileRoutes');
const socketController = require('./controllers/socketController');
const authRoutes = require("./routes/authRoutes");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const io = new SocketServer(server, {
    cors: { origin: '*' },
});

socketController(io);

app.use('/api/files', fileRoutes);
app.use("/api/auth", authRoutes);

// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Connected to MongoDB...');
//         server.listen(process.env.PORT, () => {
//             console.log('🐋 Server is listening on port 9000!');
//         });
//     })
//     .catch((error) => console.log("MongoDB connection error:", error));
server.listen(process.env.PORT, () => {
    console.log('🐋 Server is listening on port 9000!');
});