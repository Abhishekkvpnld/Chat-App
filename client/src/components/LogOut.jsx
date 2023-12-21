import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
// import axios from 'axios'
import { BiPowerOff } from 'react-icons/bi';
import './LogOut.css'

function LogOut() {
  const navigate = useNavigate();
  const handleClick = async () => {
    const shouldLogout = window.confirm('Are you sure you want to log out?');

    if (shouldLogout) {
      localStorage.clear();
      navigate('/login')
      console.log('Logging out...');
    }
  }
  return (
    <Button className='button' onClick={handleClick}>
      Logout<BiPowerOff />
    </Button>
  )
}
const Button = styled.button``;


export default LogOut