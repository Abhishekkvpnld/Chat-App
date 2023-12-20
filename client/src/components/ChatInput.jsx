import React,{useState} from 'react'
import styled from 'styled-components'
import EmojiPicker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'

function ChatInput({handleSendMsg}) { 
    const [showEmojiPicker,setShowEmojiPicker] = useState(false)
    const [msg,setMsg] = useState('')


const handleEmojiPickerHideShow = ()=>{
    setShowEmojiPicker(!showEmojiPicker)
}

const handleEmojiClick = (event, emoji) => {
  console.log('emoji', emoji);
  let message = msg;
  message += emoji.emoji;
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
    <Container>
        <div className="button-container">
            <div className="emoji" >
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow}/>
                {
                    showEmojiPicker && <EmojiPicker  onEmojiClick={handleEmojiClick}/>
                }
            </div>
        </div>
        <form  className="input-container" onSubmit={(e)=>sendMsg(e)}>
            <input type="text" placeholder='type your message here...' value={msg} onChange={(e)=>setMsg(e.target.value)} />
            <button className='submit'>
                <IoMdSend/>
            </button>
        </form>
    </Container>
  )
}
const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;

    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: yellow;
        cursor: pointer;
       
      }
      .emoji-picker-react {
        position: absolute;
        margin-bottom:-400px;
        width: 300px; 
        height: 300px;
        background-color:black;
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-content: center;
    gap:2rem;
    background-color: transparent;

    input {
      width: 100%;
      // height: 60%;
      background-color:white;
      color:black;
      border: none;
      caret-color:blue;
      border-radius:2rem;
      padding-left:2rem;
      font-size: 1rem;
      &::selection {
        background-color: #9186f3;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.1rem 1rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: yellowgreen;
      border: none;
      cursor:pointer;

      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;

export default ChatInput;