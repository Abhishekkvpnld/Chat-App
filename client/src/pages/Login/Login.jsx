import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import axios from 'axios';
import icon from '../../assets/logo.svg';
import { loginRoute } from '../../utils/APIRoutes';

function Login() {
  
  const navigate = useNavigate()

  useEffect(()=>{
if(localStorage.getItem('chat-app-user')){
navigate('/')
}
  },[navigate])

  const toastOptions = {
    position:"bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: 1,
    theme: 'light',
  };

  const [values, setValues] = useState({
    username: '',
    password: '',

  });

  const handleSubmit =async (e) => {
    e.preventDefault();
   if( handleValidation()){
    const { username, password,} = values;
    const {data} = await axios.post(loginRoute,{
      username,
      password,
    })
    if(data.status === false){
      toast.error(data.msg,toastOptions)
    }else if(data.status === true){
      localStorage.setItem('chat-app-user',JSON.stringify(data.user));
      navigate('/')
    }
   }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { username,password } = values;
    if (username.length === '') {
      toast.error('Username is required', toastOptions);
      return false;
    } else if (password === '') {
      toast.error('Password is required', toastOptions);
      return false;
    } 

    return true;
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='brand'>
            <img src={icon} alt='' />
            <h1>Chat</h1>
          </div>

          <input
            type='text'
            placeholder='Username'
            name='username'
            onChange={(e) => handleChange(e)}
          />

          <input
            type='password'
            placeholder='Password'
            name='password'
            onChange={(e) => handleChange(e)}
          />

          <button type='submit'>Create Account</button>
          <span>
            Dont't have an account? <Link to={'/register'}>Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
      background-color: white;
    }

    h1 {
      color:black;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    background-color: white;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }

  input {
    background-color: transparent;
    padding: 0.8rem;
    border: 0.1rem solid black;
    border-radius: 0.4rem;
    color: black;
    width: 100%;
    font-size: 1rem;

    &:hover {
      background-color: #F7F4F3;
      outline: none;
    }
  }

  button {
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

  span {
    color: black;
    text-transform: none;

    a {
      color: #4e0eff;
      text-transform: none;
      font-weight: bold;
    }
  }
`;

export default Login