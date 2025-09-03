import express from 'express';
import http from 'http';
import {Server} from "socket.io";

const app= express();

const server = http.createServer(app);
const io=new Server(server);
const userSocketMap = {};

const getAllConnectedClients=(roomId)=>{
    return Array.from(io.sockets.adapter.rooms.get(roomId) ||  []).map(
(socketId)=>{
    return{
        socketId,
        username:userSocketMap[socketId]
    }
})
};

io.on('connection',(socket)=>{
    // console.log(`User connected: ${socket.id}`);
    socket.on('join',({roomId, username})=>{
        userSocketMap[socket.id] = username;
        socket.join(roomId);
        const clients = getAllConnectedClients(roomId);
        // console.log(clients);
        clients.forEach(({socketId})=>{
            io.to(socketId).emit('joined',{
                clients,
                username,
                socketId: socket.id
            })
        })
    });

socket.on('code_change',({roomId, code})=>{
    socket.in(roomId).emit('code_change',{code});
});

socket.on("sync-code",({socketId, code})=>{
    io.to(socketId).emit("code_change",{code});
});



    socket.on('disconnecting', ()=>{
    const rooms= [...socket.rooms];
    rooms.forEach((roomId)=>{
        socket.in(roomId).emit('disconnected',{
            socketId: socket.id,
            username: userSocketMap[socket.id],
        });
    });
    delete userSocketMap[socket.id];
    socket.leave();
});
});




const PORT= 5000;
server.listen(PORT,()=>console.log('server is running'));


