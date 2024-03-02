import React, { useState, useEffect,useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { allUserRoute,host } from '../../utils/APIRoutes';
import Contacts from '../../components/Contacts';
import Welcome from '../../components/Welcome';
import ChatContainer from '../../components/ChatContainer.jsx';
import {io} from 'socket.io-client';
import './Chat.css'

function Chat() {
  
  const navigate = useNavigate();
  const socket = useRef()

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat,setCurrentChat] = useState(undefined)
  const [isLoaded,setIsLoaded] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate('/login');
      } else {
        const storedUser =await localStorage.getItem("chat-app-user");
        const parsedUser = await JSON.parse(storedUser);
      setCurrentUser(parsedUser);
       setIsLoaded(true)
      }
    };

    fetchData();
  }, [navigate]);


  useEffect(()=>{
if(currentUser){
  socket.current = io(host);
  socket.current.emit("add-user",currentUser._id)
}
  },[currentUser])


  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUserRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate('/setAvatar');
        }
      }
    };

    fetchData();
  }, [currentUser,navigate]);

  
const handleChatChange = (chat)=>{
setCurrentChat(chat)
}

  return (
   
    <Container className='chat-container'>
      <div className='chat-section'>
      <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
        {
        isLoaded && currentChat === undefined ? (
        <Welcome currentUser={currentUser}/>
          ): (
            <ChatContainer  currentChat={currentChat}  currentUser={currentUser} socket={socket} />
          )
        }
        
      </div>
    </Container>
  );
}

const Container = styled.div``;

export default Chat;
