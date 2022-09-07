import styled from 'styled-components'
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa'
import openSocket from 'socket.io-client'
import { useEffect } from 'react'
import ContainerComp from './components/Container'

function App() {
  return <div className="app">
    <ContainerComp/>
  </div>
}

export default App