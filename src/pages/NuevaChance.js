import React, {useState} from 'react'
import Follow from '../components/Follow'
import Footer from '../components/Footer'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <>
    <div className='nuevachance'>
        <h2>¿Querés ganar otro premio?</h2>
        <p>Solo debes seguir a las siguientes cuentas en Instagram</p>
        <Follow />
    </div>
    <Footer />
    </>
  )
}

export default Home