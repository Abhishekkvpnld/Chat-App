import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

function Contacts({ contacts, currentUser }) {
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
setCurrentSelected(index)
    };

    return (
        <>
            {currentUserImage && currentUserName && (
                <Container>
                    <div className='brand'>
                        <img src="" alt="" />
                        <h3>CHATme</h3>
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
                         {contacts.map((contact,index) => (
                            <div
                                className={`contact ${index === currentSelected ? 'selected' : ''}`}
                                key={index}
                                onClick={() => changeCurrentUser(index, contact)}
                            >
                                <div className='avatar'>
                                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt='avatar' />
                                </div>
                                <div className='username'>
                                  {console.contact}
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

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img {
      height: 2rem;
    }

    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    scrollbar-width: thin;

    ::-webkit-scrollbar {
      width: 0.2rem;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }

    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }

      &.selected {
        background-color: blue;
      }
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: white;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;

      .username {
        font-size: 1rem;
      }
    }
  }
`;

export default Contacts;