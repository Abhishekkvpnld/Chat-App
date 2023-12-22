import React,{useState} from 'react'
import styled from 'styled-components'
import EmojiPicker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
import './ChatInput.css'

function ChatInput({handleSendMsg}) { 
    const [showEmojiPicker,setShowEmojiPicker] = useState(false)
    const [msg,setMsg] = useState('')


const handleEmojiPickerHideShow = ()=>{
    setShowEmojiPicker(!showEmojiPicker)
}

const handleEmojiClick = (event, emojiObject) => {
  console.log('emoji', emojiObject);
  let message = msg || '';
  message += emojiObject.emoji;
  console.log('messages:' +message)
  setMsg(message);
};


const sendMsg = (e)=>{
  e.preventDefault()
if(msg.length>0){
handleSendMsg(msg)
setMsg('')
}
}

  return (
    <Container className='chat-input'>
        <div className="button-container">
            <div className="emoji" >
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                {
                    showEmojiPicker && <EmojiPicker  onEmojiClick={handleEmojiClick}/>
                }
            </div>
        </div>
        <form  className="input-container" onSubmit={(e)=>sendMsg(e)}>
            <input className='input-section' type="text" placeholder='type your message here...' value={msg} onChange={(e)=>setMsg(e.target.value)} />
            <button className='submit'>
                <IoMdSend/>
            </button>
        </form>
    </Container>
  )
}
const Container = styled.div``;

export default ChatInput;