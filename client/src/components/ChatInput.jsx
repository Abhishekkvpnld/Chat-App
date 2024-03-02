import React, { useState } from 'react'
import styled from 'styled-components'
import EmojiPicker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { TiAttachmentOutline } from "react-icons/ti";
import { BsEmojiSmileFill } from 'react-icons/bs'
import './ChatInput.css'
// import convertToBase64 from './convert';

function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState('')

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }


  // const handleFileSend = async (file) => {
  //   if (file) {
  //     const base64 = await convertToBase64(file)
  //     setFile(base64);
  //     setMsg('Send File')
  //   }
  // }



  const handleEmojiClick = (event, emojiObject) => {
    let message = msg || '';
    message += emojiObject.emoji;
    setMsg(message);
  };


  const sendMsg = async(e) => {
    e.preventDefault()

    if (file) {
      alert(file)
      setMsg('');
      await handleSendMsg(msg,file)
      setFile('')

    } else {

      if (msg.length > 0) {
       await handleSendMsg(msg, file)
        setMsg('')
      }
    }
  }

  return (
    <Container className='chat-input'>
      <div className="button-container">
        <div className="emoji" >
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {
            showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />
          }
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendMsg(e)}>
        <input className='input-section' type="text" placeholder='type your message here...' value={msg} onChange={(e) => setMsg(e.target.value)} />
        <label htmlFor="addFile">
          {/* <input type="file" accept="image/*" name='addFile' id='addFile' style={{ display: "none" }} onChange={(e) => handleFileSend(e.target.files[0])} /> */}
          <button className='file' style={{ margin: "5px", backgroundColor: "white", width: "80px" }}> <TiAttachmentOutline style={{ color: "black", fontSize: "30px" }} /></button>
        </label>

        <button className='submit'> <IoMdSend /> </button>
      </form>
    </Container>
  )
}
const Container = styled.div``;

export default ChatInput;