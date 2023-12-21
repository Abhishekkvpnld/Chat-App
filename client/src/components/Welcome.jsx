import React from 'react'
import styled from 'styled-components'
import Robot from '../assets/robot.gif'
import './Welcome.css'

function Welcome({currentUser}) {
  return (
    <Container className="welcome-container" >
        <img src={Robot} alt="Robot" />
    <h1>Welcome <span>{currentUser? currentUser.username+'': ''} </span>! </h1>
        <h3>Please select a chat to start messaging</h3> 
    </Container>
  )
}

const Container = styled.div``;
export default Welcome;