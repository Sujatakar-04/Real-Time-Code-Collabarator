import React,{useState} from 'react';
import {v4 as uuid} from 'uuid';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



function Home() {
const [roomId, setRoomId]= useState("");
const [username, setUsername] = useState("");
const navigate=useNavigate();

const generateRoomId =(e)=>{
  e.preventDefault();
const id = uuid();
setRoomId(id);
toast.success("Room Id is Generated")
};


const joinRoom=()=>{
  if(!roomId|| !username)
  {
    toast.error("Both field is Required");
    return;
  }

navigate(`/editor/${roomId}`,{
  state:{username},
});
toast.success("Room is Created");

};
  return (
    <div class name ="container-fluid">
<div className="row justify-content-center align-items-center min-vh-100">
<div className='col-12 col-md-6'>
  <div className='card shadow-sm p-2 mb-5 bg-secondary rounded'>
    <div className='card-body text-center bg-dark'>
      <img className="img -fluid mx-auto d-block" src="/banner.png" alt="banner" style={{maxWidth:"150px"}}/>
      <h4 className='text-light'>Enter the room id</h4>
      <div className='form-group'>
        <input 
        value={roomId}
        onChange={(e)=>setRoomId(e.target.value)}
        type="text" className='form-control mb-2' placeholder='ROOM ID'/>
      </div>
            <div className='form-group'>
        <input 
        value={username}
        onChange={(e)=>setUsername(e.target.value)}
        type="text" className='form-control mb-2' placeholder=' Username'/>
      </div>
      <button className='btn btn-success btn-lg btn-block' onClick={joinRoom}>JOIN</button>
      <p className='mt-3 text-light'>Don't Have a Room Id? 
        <span className='text-success p-2' style={{cursor:'pointer'}} onClick={generateRoomId}>
        New Room</span></p>
    </div>
  </div>
</div>


  </div>
    </div>
  )
}

export default Home
