import React,{useEffect,useRef,useState} from 'react'
import styled from 'styled-components'
import LogOut from './LogOut'
import ChatInput from './ChatInput'
import axios from 'axios'
import {v4 as uuidv4} from 'uuid'
import './ChatContainer.css'
import { getAllMessageRoute, sendMessageRoute } from '../utils/APIRoutes'

function ChatContainer({currentChat,currentUser,socket}) {
   
    const scrollRef = useRef()
    const [messages,setMessages] = useState([ ])
    const [arrivalMessage,setArrivalMessage] = useState(null)

    useEffect(() => {
        const fetchMessages = async () => {
            try {
              if(currentChat){
                const response = await axios.post(getAllMessageRoute, {
                  from: currentUser._id,
                  to: currentChat._id,
              });
                  setMessages(response.data);
              }   
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [currentUser,currentChat]);
    

    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currentUser._id,
            to: currentChat._id,
            message: msg,
        });

        socket.current.emit("send-msg",{
          to:currentChat._id,
          from:currentUser._id,
            message:msg
        })

        const msgs = [...messages]
        msgs.push({fromSelf:true,message:msg})
        setMessages(msgs)
    };
    
    useEffect(()=>{
if(socket.current){
    socket.current.on("msg-recieve",(msg)=>{
      setArrivalMessage({fromSelf:false,message:msg})
    })
}
    },[socket])

useEffect(()=>{
arrivalMessage && setMessages((pre)=>[...pre,arrivalMessage])
},[arrivalMessage])

useEffect(() => {
  const container = scrollRef.current;
  if (container) {
    container.scrollTop = container.scrollHeight;
  }
}, [messages]);



    return (
        <>
          {currentChat && (
            <Container className='chat-container'>
              <div className="chat-header">
                <div className="user-details">
                  <div className="avatar">
                    <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="avatar" />
                  </div>
                  <div className='username'>
                    <h3>{currentChat.username}</h3>
                  </div>
                </div>
                <div><LogOut/></div>
              </div>
              <div className="chat-messages">
                {
                  messages.map((message) => (
                    <div ref={scrollRef} key={uuidv4()}>
                      <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                        <div className="content">
                          <p>{message.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
              <div className='chat-input'>
              <ChatInput handleSendMsg={handleSendMsg} />
              </div>
             
            </Container>
          )}
        </>
      );
}
const Container = styled.div``;

export default ChatContainer