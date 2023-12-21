import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loader from '../../assets/loader.gif';
import styled from 'styled-components';
import axios from 'axios';
import { setAvatarRoute } from '../../utils/APIRoutes';
import { Buffer } from 'buffer';
// import './setAvatar.css';

function SetAvatar() {
  const navigate = useNavigate()
  const api = "https://api.multiavatar.com/4567565";
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 1,
    theme: 'light',
  };
  useEffect(()=>{
if( !localStorage.getItem("chat-app-user")){
  navigate('/login')
}
  },[navigate])

  const setProfilePicture = async () => {

      if (selectedAvatar === undefined) {
        toast.error('Please select an avatar', toastOptions);
        console.log('please select an avatar')
      } else {
        const user = JSON.parse(localStorage.getItem('chat-app-user'));
        console.log('got user')
        const { data } = await axios.post(`${setAvatarRoute}/${user._id}`,{image:avatars[selectedAvatar]});
        
        if (data.isSet) {
          user.isAvatarImageSet = true;
          user.avatarImage = data.image;
          localStorage.setItem("chat-app-user", JSON.stringify(user));
          navigate('/');
        } else {
          toast.error('An error occurred. Please try again', toastOptions);
        }
      }
  
  };
  

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 5; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 100)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString('base64'));
      }
      setAvatars(data);
      setIsLoading(false);
    };

    fetchAvatars();
  }, []);

  return (
    <div>

{
  isLoading ? <Container>
    <img src={loader} alt="loader"  className='loader'/>
  </Container> : (
    
    
    <Container>
        <div className='title-container'>
          <h1>Pick an avatar as your profile picture</h1>
        </div>
       <div className='avatars'>
  {avatars.map((avatar, index) => (
    <div key={index} className={`avatar ${selectedAvatar === index ? 'selected': ''}`}>
      <img
        src={`data:image/svg+xml;base64,${avatar}`}
        alt={`Avatar ${index}`}
        onClick={() => setSelectedAvatar(index)}
        />
    </div>
  ))}
</div>
<button className='submit-btn' onClick={setProfilePicture}>Set as profile picture</button>
      </Container>
)}
      <ToastContainer />
    </div>
  );
}
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;  // Fix the typo here
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;

.loader {
  max-inline-size: 100%;
}

.title-container {
  h1 {
    color: white;
  }
}

.avatars {
  display: flex;
  gap: 2rem;

  .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;

    img {
      height: 6rem;
    }
  }

  .selected {
    border: 0.4rem solid #4e0eff;
  }
}

.submit-btn {
  background-color: #997af0;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  transition: 0.5s ease-in-out;

  &:hover {
    background-color: #4e0eff;
  }
}
`;

export default SetAvatar;
