
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from "../assets/messages.png";
import './Contacts.css';

function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const changeCurrentUser = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container className='chat-container'>
          
          <div className='brand'>
            <img src={Logo} alt="" />
            <h3>𝓒𝓗𝓐𝓣𝓶𝓮</h3>
          </div>

          <div className='contacts'>
            {contacts.map((contact, index) => (
              <div
                className={`contact ${index === currentSelected ? 'selected' : ''}`}
                key={index}
                onClick={() => changeCurrentUser(index, contact)}
              >
                <div className='avatar'>
                  <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt='avatar' />
                </div>
                <div className='username'>
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className='current-user'>
            <div className='avatar'>
              <img src={`data:image/svg+xml;base64,${currentUserImage}`} alt='avatar' />
            </div>
            <div className='username'>
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div``;

export default Contacts;
